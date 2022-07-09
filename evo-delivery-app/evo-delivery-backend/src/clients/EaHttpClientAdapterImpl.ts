import {
    Depot,
    DistanceMatrix,
    Driver,
    EaComponentDetails,
    EaComponentTypes,
    EaEvaluateConfig,
    EaEvaluateResponse,
    Order,
} from '../types';
import {EaHttpClientAdapter} from './EaHttpClientAdapter';
import {EaHttpConverter} from './utils/EaHttpConverter';
import {EaHttpClient} from "./EaHttpClient";

export class EaHttpClientAdapterImpl implements EaHttpClientAdapter {
    private readonly eaHttpClient: EaHttpClient;
    private readonly converter: EaHttpConverter;

    constructor(
        httpClient: EaHttpClient,
        converter: EaHttpConverter,
    ) {
        this.eaHttpClient = httpClient;
        this.converter = converter;
    }

    evaluate(
        _drivers: Driver[],
        _orders: Order[],
        _depot: Depot,
        _distanceMatrix: DistanceMatrix,
        _config: EaEvaluateConfig
    ): Promise<EaEvaluateResponse> {
        const requestBody = this.converter.toEaHttpRequestBody(_drivers, _orders, _depot, _distanceMatrix, _config);
        return this.eaHttpClient.evaluate(requestBody);
    }

    getComponentDetails(
        componentType: EaComponentTypes
    ): Promise<EaComponentDetails[]> {
        return this.eaHttpClient.getComponentDetails(componentType);
    }
}
