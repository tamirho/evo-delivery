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
    requestBody: EaEvaluateHttpRequestBody
  ): Promise<EaEvaluateResponse> {

    const headers = {'Content-Type': 'application/json'};
    const url = `${this.baseUrl}/${this.apiUrlPrefix}/evaluate`;
    const data = JSON.stringify(requestBody);
    const options = { headers };

    return this.httpClient.post({ url, data, options });
  }

  getComponentDetails(
    componentType: EaComponentTypes
  ): Promise<EaComponentDetails[]> {
    const url = `${this.baseUrl}/${this.apiUrlPrefix}/${componentType}/details`;

    return this.httpClient.get({ url });
  }

  terminate(
    run_id: string
  ): Promise<void> {
    const headers = { "Content-Type": "application/json" };
    const url = `${this.baseUrl}/${this.apiUrlPrefix}/terminate/:${run_id}`;
    const options = { headers };

    return this.httpClient.post({ url, options });
  }
}
