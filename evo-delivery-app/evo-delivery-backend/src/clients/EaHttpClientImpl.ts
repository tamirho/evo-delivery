import { EA_ENGINE_API_V1_URL } from '../configs';
import {
  EaComponentDetails,
  EaComponentTypes,
  EaEvaluateHttpRequestConfig,
  EaEvaluateResponse,
  EaEvaluateHttpRequestBody,
  EaHttpRequestDistances,
  EaHttpRequestDriver,
  EaHttpRequestOrder,
} from '../types';
import { EaHttpClient } from './EaHttpClient';
import { HttpClient } from './HttpClient';

export class EaHttpClientImpl implements EaHttpClient {
  private readonly httpClient: HttpClient;
  private readonly baseUrl: string;
  private readonly apiUrlPrefix: string = EA_ENGINE_API_V1_URL;

  constructor(httpClient: HttpClient, baseUrl: string) {
    this.httpClient = httpClient;
    this.baseUrl = baseUrl;
  }

  evaluate(
    drivers: EaHttpRequestDriver[],
    orders: EaHttpRequestOrder[],
    depotId: string,
    distanceMatrix: EaHttpRequestDistances,
    config: EaEvaluateHttpRequestConfig
  ): Promise<EaEvaluateResponse> {

    const body: EaEvaluateHttpRequestBody = {
      data: { drivers, orders, distances: distanceMatrix, root_id: depotId },
      config,
    };
    const headers = {'Content-Type': 'application/json'};
    const url = `${this.baseUrl}/${this.apiUrlPrefix}/evaluate`;
    const data = JSON.stringify(body);
    const options = { headers };

    console.log(`POST ${url} with body ${data}`);

    return this.httpClient.post({ url, data, options });
  }

  getComponentTypes(
    componentType: EaComponentTypes
  ): Promise<EaComponentDetails[]> {
    const url = `${this.baseUrl}/${this.apiUrlPrefix}/${componentType}/types`;

    console.log(`GET ${url}`);

    return this.httpClient.get({ url });
  }
}
