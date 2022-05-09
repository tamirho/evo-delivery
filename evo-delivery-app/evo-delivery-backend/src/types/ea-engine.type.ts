export enum EaComponentTypes {
	SELECTION = 'selection',
	FITNESS = 'fitness',
	MUTATE = 'mutate',
	CROSSOVER = 'crossover'
}

export type EaComponentKwargs = {
	name: string;
	type: string;
	description: string;
};

export type EaComponentDetails = {
	name: string;
	description: string;
	kwargs: EaComponentKwargs[];
};

export type EaHttpOrder = {
	id: string;
	weight: number;
};

export type EaHttpDriver = {
	id: string;
	max_capacity: number;
	max_distance: number;
};

export type EaHttpDistancesColData = number;

export type EaHttpDistancesRowData = {
	[to: string]: EaHttpDistancesColData;
};

export type EaHttpDistances = {
	[from: string]: EaHttpDistancesRowData;
};

export type EaEvaluateHttpRequestData = {
	drivers: EaHttpDriver[];
	orders: EaHttpOrder[];
	distances: EaHttpDistances;
};

export type EaDriverRoute = number[];

export type EaEvaluateResponse = {
	[driverId: string]: EaDriverRoute;
};
