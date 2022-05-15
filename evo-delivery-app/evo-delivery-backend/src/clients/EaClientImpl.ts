import { EA_ENGINE_API_V1_URL } from '../configs';
import {
  DistanceMatrix,
  Driver,
  EaComponentDetails,
  EaComponentTypes,
  EaConfigParams,
  EaEvaluateHttpRequestArgs,
  EaEvaluateHttpRequestKwargs,
  EaEvaluateHttpResponse,
  EaConfigParamsArgs,
  EaEvaluateRequestBody,
  EaHttpRequestDistances,
  EaHttpRequestDriver,
  EaHttpRequestOrder,
  IdWithAddress,
  Order,
} from '../types';
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
    _rootAddress: IdWithAddress,
    _distances: DistanceMatrix,
    _args: EaConfigParams = {},
    _kwargs: EaConfigParamsArgs = {}
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

    const root_id = this.converter.convertRoot(_rootAddress);

    const body: EaEvaluateRequestBody = {
      data: { drivers, orders, distances, root_id },
      kwargs,
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    const url = `${this.baseUrl}/${this.apiUrlPrefix}/evaluate`;
    const data = JSON.stringify(body);
    const options = { headers, params };

    console.log(data)
    return this.httpClient.post({ url, data, options });
  }

  getComponentTypes(
    componentType: EaComponentTypes
  ): Promise<EaComponentDetails[]> {
    const url = `${this.baseUrl}/${this.apiUrlPrefix}/${componentType}/types`;

    return this.httpClient.get({ url });
  }
}
