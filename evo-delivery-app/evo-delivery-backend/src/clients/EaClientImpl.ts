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
  EaEvaluateRequestBody,
  EaHttpRequestDistances,
  EaHttpRequestDriver,
  EaHttpRequestOrder,
  Order,
} from '../types';
import { convertObjCamelToSnakeCase } from '../utils';
import { EaClient } from './EaClient';
import { HttpClient } from './HttpClient';
import { EaHttpConverter } from './utils/EaHttpConverter';

export class EaClientImpl implements EaClient {
  private readonly httpClient: HttpClient;
  private readonly converter: EaHttpConverter;
  private readonly baseUrl: string;
  private readonly apiUrlPrefix: string = EA_ENGINE_API_V1_URL;

  constructor(
    httpClient: HttpClient,
    converter: EaHttpConverter,
    baseUrl: string
  ) {
    this.httpClient = httpClient;
    this.converter = converter;
    this.baseUrl = baseUrl;
  }

  evaluate(
    _drivers: Driver[],
    _orders: Order[],
    _distances: DistanceMatrix,
    _args: EaEvaluateArgs = {},
    _kwargs: EaEvaluateKwargs = {}
  ): Promise<EaEvaluateHttpResponse> {
    const drivers: EaHttpRequestDriver[] = _drivers.map(
      this.converter.convertDriver
    );

    const orders: EaHttpRequestOrder[] = _orders.map(
      this.converter.convertOrder
    );

    const distances: EaHttpRequestDistances =
      this.converter.convertDistances(_distances);

    const params: EaEvaluateHttpRequestArgs = this.converter.convertArgs(_args);

    const kwargs: EaEvaluateHttpRequestKwargs =
      this.converter.convertKwargs(_kwargs);

    const body: EaEvaluateRequestBody = {
      data: { drivers, orders, distances },
      kwargs,
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    const url = `${this.baseUrl}/${this.apiUrlPrefix}/evaluate`;
    const data = JSON.stringify(body);
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
