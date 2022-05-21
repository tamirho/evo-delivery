export const camelToSnakeCase = (str: string) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
export const snakeToCamelCase = (str: string) => str.replace(/(_\w)/g, (k) => k[1].toUpperCase());

const isObject = (obj: any) => typeof obj === 'object' && obj !== null;

export const createObjNamingConventionConverter = (convertStrategy: (str: string) => string) => {
	const genericConverter = (obj: { [key: string]: any }) => {
		return Object.entries(obj).reduce((newObj, [ key, value ]) => {
			value = isObject(value) ? genericConverter(value) : value;
			newObj[convertStrategy(key)] = value;
			return newObj;
		}, {});
	};

	return genericConverter;
};

export const convertObjSnakeToCamelCase = createObjNamingConventionConverter(snakeToCamelCase);
export const convertObjCamelToSnakeCase = createObjNamingConventionConverter(camelToSnakeCase);
