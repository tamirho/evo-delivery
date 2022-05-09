import { EA_ENGINE_API_V1_URL } from '../configs';
import {
	DistanceMatrix,
	Driver,
	EaComponentDetails,
	EaComponentTypes,
	EaEvaluateResponse,
	EaHttpDistances,
	EaHttpDriver,
	EaHttpOrder,
	Order
} from '../types';
import { convertObjCamelToSnakeCase } from '../utils';
import { EaClient } from './EaClient';
import { HttpClient } from './HttpClient';

export class EaClientImpl implements EaClient {
	private readonly httpClient: HttpClient;
	private readonly baseUrl: string;
	private readonly apiUrlPrefix: string = EA_ENGINE_API_V1_URL;

	constructor(httpClient: HttpClient, baseUrl: string) {
		this.httpClient = httpClient;
		this.baseUrl = baseUrl;
	}

	private convertToEaHttpDriver({ id, maxCapacity, maxDistance }: Driver) {
		return convertObjCamelToSnakeCase({
			id,
			maxCapacity,
			maxDistance
		}) as EaHttpDriver;
	}

	private convertToEaHttpOrder({ id, weight }: Order) {
		return convertObjCamelToSnakeCase({
			id,
			weight
		}) as EaHttpOrder;
	}

	private convertToEaHttpDistances(distanceMatrix: DistanceMatrix) {
		return Object.entries(distanceMatrix).reduce((distancesAccumulator, [ from, rowData ]) => {
			distancesAccumulator[from] = Object.entries(rowData).reduce((rowDataAccumulator, [ to, colData ]) => {
				rowDataAccumulator[to] = colData.distance.value;
				return rowDataAccumulator;
			}, {});
			return distancesAccumulator;
		}, {}) as EaHttpDistances;
	}

	evaluate(driversData: Driver[], ordersData: Order[], distanceMatrix: DistanceMatrix): Promise<EaEvaluateResponse> {
		const drivers: EaHttpDriver[] = driversData.map(this.convertToEaHttpDriver);
		const orders: EaHttpOrder[] = ordersData.map(this.convertToEaHttpOrder);
		const distances: EaHttpDistances = this.convertToEaHttpDistances(distanceMatrix);

		const url = `${this.baseUrl}/${this.apiUrlPrefix}/evaluate`;
		const data = JSON.stringify({ data: { drivers, orders, distances }, kwargs: {} });
		const headers = {
			'Content-Type': 'application/json'
		};
		const options = { headers };

		console.dir({ url, data }, { depth: 10 });
		return this.httpClient.post({ url, data, options });
	}

	getComponentTypes(componentType: EaComponentTypes): Promise<EaComponentDetails[]> {
		const url = `${this.baseUrl}/${this.apiUrlPrefix}/${componentType}/types`;

		return this.httpClient.get({ url });
	}
}
