export const capitalize = (name: string) => `${name[0]?.toUpperCase()}${name.slice(1).toLowerCase()}`;
export const toPlural = (name: string) => (name.endsWith('s') ? name : `${name}s`);
export const toSingular = (name: string) => name.replace(/s$/, '');
export const toHumanReadableStr = (str: string) => str?.replace(/([-_])/g, ' ').replace(/([A-Z])/g, ' $1') || '';
