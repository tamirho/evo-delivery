import {
  Depot,
  DistanceMatrix,
  Driver,
  EaComponentDetails,
  EaComponentTypes,
  EaEvaluateConfig,
  EaEvaluateResponse,
  Order,
} from "../types";
import { EaHttpClientAdapter } from "./EaHttpClientAdapter";
import { EaHttpConverter } from "./utils/EaHttpConverter";
import { EaHttpClient } from "./EaHttpClient";
import { runInContext } from "vm";

export class EaHttpClientAdapterImpl implements EaHttpClientAdapter {
  private readonly eaHttpClient: EaHttpClient;
  private readonly converter: EaHttpConverter;

  constructor(httpClient: EaHttpClient, converter: EaHttpConverter) {
    this.eaHttpClient = httpClient;
    this.converter = converter;
  }

  evaluateWithReturn(
    drivers: Driver[],
    orders: Order[],
    depot: Depot,
    distanceMatrix: DistanceMatrix,
    config: EaEvaluateConfig
  ): Promise<EaEvaluateResponse> {
    const requestBody = this.converter.toEaHttpRequestBody(
      drivers,
      orders,
      depot,
      distanceMatrix,
      config
    );
    return this.eaHttpClient.evaluateWithReturn(requestBody);
  }

  evaluateWithUpdate(
    drivers: Driver[],
    orders: Order[],
    depot: Depot,
    runId: string,
    distanceMatrix: DistanceMatrix,
    config: EaEvaluateConfig
  ): Promise<void> {
    const requestBody = this.converter.toEaHttpRequestBody(
      drivers,
      orders,
      depot,
      distanceMatrix,
      config,
      runId
    );
    const body = { ...requestBody, runId: runId };
    return this.eaHttpClient.evaluateWithUpdate(body);
  }

  getComponentDetails(
    componentType: EaComponentTypes
  ): Promise<EaComponentDetails[]> {
    return this.eaHttpClient.getComponentDetails(componentType);
  }

  terminate(runId: string): Promise<void> {
    return this.eaHttpClient.terminate(runId);
  }
}
