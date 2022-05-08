import { DistanceMatrix, EaComponentDetails, EaComponentTypes } from '../types';
import { EaClient, EaEvaluateResponse } from './EaClient';
import { HttpClient } from './HttpClient';


export class EaClientImpl implements EaClient {
    private readonly httpClient: HttpClient;
    private readonly baseUrl: string;

    constructor(httpClient: HttpClient, baseUrl: string) {
        this.httpClient = httpClient;
        this.baseUrl = baseUrl;
    }

    evaluate(distanceMatrix: DistanceMatrix): Promise<EaEvaluateResponse> {
        const data = { distanceMatrix };
        const url = `${this.baseUrl}/evaluate`;

        return this.httpClient.post({ url, data })
    };

    getComponentTypes(componentType: EaComponentTypes): Promise<EaComponentDetails[]> {
        const url = `${this.baseUrl}/${componentType}/types`;

        return this.httpClient.get({ url })
    };


}