import {
    Depot,
    DistanceMatrix,
    Driver,
    EaComponentDetails,
    EaComponentTypes,
    EaEvaluateConfig, EaEvaluateResponse, EaHttpRequestDistances, EaHttpRequestDriver, EaHttpRequestOrder,
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
        const drivers: EaHttpRequestDriver[] = _drivers.map(this.converter.convertDriver);
        const orders: EaHttpRequestOrder[] = _orders.map(this.converter.convertOrder);
        const distances: EaHttpRequestDistances = this.converter.convertDistances(_distanceMatrix);
        const depotId = this.converter.convertDepot(_depot);
        const config = this.converter.convertConfig(_config);

        return this.eaHttpClient.evaluate(drivers, orders, depotId, distances, config);
    }

    getComponentDetails(
        componentType: EaComponentTypes
    ): Promise<EaComponentDetails[]> {
        return this.eaHttpClient.getComponentDetails(componentType);
    }
}
