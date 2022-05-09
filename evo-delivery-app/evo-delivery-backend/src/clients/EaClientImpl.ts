import { EA_ENGINE_API_V1_URL } from '../configs';
import { DistanceMatrix, EaComponentDetails, EaComponentTypes } from '../types';
import { EaClient, EaEvaluateResponse } from './EaClient';
import { HttpClient } from './HttpClient';


export class EaClientImpl implements EaClient {
    private readonly httpClient: HttpClient;
    private readonly baseUrl: string;
    private readonly apiUrlPrefix: string = EA_ENGINE_API_V1_URL;

    constructor(httpClient: HttpClient, baseUrl: string) {
        this.httpClient = httpClient;
        this.baseUrl = baseUrl;
    }

    evaluate(distanceMatrix: DistanceMatrix): Promise<EaEvaluateResponse> {
        const data = { distanceMatrix };
        const url = `${this.baseUrl}/${this.apiUrlPrefix}/evaluate`;

        return this.httpClient.post({ url, data })
    };

    getComponentTypes(componentType: EaComponentTypes): Promise<EaComponentDetails[]> {
        const url = `${this.baseUrl}/${this.apiUrlPrefix}/${componentType}/types`;

        return this.httpClient.get({ url })
    };
}