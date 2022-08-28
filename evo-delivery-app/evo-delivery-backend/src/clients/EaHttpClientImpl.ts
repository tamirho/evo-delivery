import { EA_ENGINE_API_V1_URL } from '../configs';
import {
  EaComponentDetails,
  EaComponentTypes,
  EaEvaluateResponse,
  EaEvaluateHttpRequestBody,
} from '../types';
import { camelToSnakeCase } from '../utils';
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

    console.log(`POST ${url} with body ${data}`);

    return this.httpClient.post({ url, data, options });
  }

  getComponentDetails(
    componentType: EaComponentTypes
  ): Promise<EaComponentDetails[]> {
    const url = `${this.baseUrl}/${this.apiUrlPrefix}/${camelToSnakeCase(componentType)}/details`;

    console.log(`GET ${url}`);

    return this.httpClient.get({ url });
  }
}
