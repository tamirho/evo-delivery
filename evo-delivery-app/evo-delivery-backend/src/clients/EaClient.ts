import { DistanceMatrix, Driver, EaComponentDetails, EaComponentTypes, EaEvaluateResponse, Order } from '../types';

export interface EaClient {
	evaluate: (drivers: Driver[], orders: Order[], distanceMatrix: DistanceMatrix) => Promise<EaEvaluateResponse>;
	getComponentTypes: (componentType: EaComponentTypes) => Promise<EaComponentDetails[]>;
}
