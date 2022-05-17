import {
  EaComponentDetails,
  EaComponentTypes,
  EaEvaluateResponse,
  EaHttpRequestDriver,
  EaHttpRequestOrder,
  EaHttpRequestDistances,
  EaEvaluateHttpRequestConfig,
} from '../types';

export interface EaHttpClient {
  evaluate: (
    drivers: EaHttpRequestDriver[],
    orders: EaHttpRequestOrder[],
    depotId: string,
    distanceMatrix: EaHttpRequestDistances,
    config: EaEvaluateHttpRequestConfig
  ) => Promise<EaEvaluateResponse>;
  
  getComponentDetails: (
    componentType: EaComponentTypes
  ) => Promise<EaComponentDetails[]>;
}


