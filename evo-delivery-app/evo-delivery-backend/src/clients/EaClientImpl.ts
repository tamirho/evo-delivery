import { EA_ENGINE_API_V1_URL } from '../configs';
import {
  DistanceMatrix,
  Driver,
  EaComponentDetails,
  EaComponentTypes,
  EaEvaluateArgs,
  EaEvaluateHttpRequestArgs,
  EaEvaluateHttpRequestKwargs,
  EaEvaluateHttpResponse,
  EaEvaluateKwargs,
  EaHttpRequestDistances,
  EaHttpRequestDriver,
  EaHttpRequestOrder,
  Order,
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
      maxDistance,
    }) as EaHttpRequestDriver;
  }

  private convertToEaHttpOrder({ id, weight }: Order) {
    return convertObjCamelToSnakeCase({
      id,
      weight,
    }) as EaHttpRequestOrder;
  }

  private convertToEaHttpDistances(distanceMatrix: DistanceMatrix) {
    return Object.entries(distanceMatrix).reduce(
      (distancesAccumulator, [from, rowData]) => {
        distancesAccumulator[from] = Object.entries(rowData).reduce(
          (rowDataAccumulator, [to, colData]) => {
            rowDataAccumulator[to] = colData.distance.value;
            return rowDataAccumulator;
          },
          {}
        );
        return distancesAccumulator;
      },
      {}
    ) as EaHttpRequestDistances;
  }

  private convertToEaHttpArgs(args: EaEvaluateArgs): EaEvaluateHttpRequestArgs {
    return convertObjCamelToSnakeCase(args);
  }

  private convertToEaHttpKwargs(
    kwargs: EaEvaluateKwargs
  ): EaEvaluateHttpRequestKwargs {
    return convertObjCamelToSnakeCase(kwargs);
  }

  evaluate(
    _drivers: Driver[],
    _orders: Order[],
    _distances: DistanceMatrix,
    _args: EaEvaluateArgs = {},
    _kwargs: EaEvaluateKwargs = {}
  ): Promise<EaEvaluateHttpResponse> {
    const drivers: EaHttpRequestDriver[] = _drivers.map(
      this.convertToEaHttpDriver
    );
    const orders: EaHttpRequestOrder[] = _orders.map(this.convertToEaHttpOrder);
    const distances: EaHttpRequestDistances =
      this.convertToEaHttpDistances(_distances);

    const params: EaEvaluateHttpRequestArgs = this.convertToEaHttpArgs(_args);

    const kwargs: EaEvaluateHttpRequestKwargs =
      this.convertToEaHttpKwargs(_kwargs);

    const url = `${this.baseUrl}/${this.apiUrlPrefix}/evaluate`;
    const data = JSON.stringify({
      data: { drivers, orders, distances },
      kwargs,
    });
    const headers = {
      'Content-Type': 'application/json',
    };
    const options = { headers, params };

    return this.httpClient.post({ url, data, options });
  }

  getComponentTypes(
    componentType: EaComponentTypes
  ): Promise<EaComponentDetails[]> {
    const url = `${this.baseUrl}/${this.apiUrlPrefix}/${componentType}/types`;

    return this.httpClient.get({ url });
  }
}
