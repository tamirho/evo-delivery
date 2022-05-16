import {
    EaComponentDetails,
    EaComponentTypes,
    EaEvaluateResponse,
    Driver,
    Order,
    Depot,
    DistanceMatrix,
    EaEvaluateConfig,
  } from '../types';
  
  export interface EaHttpClientAdapter {
    evaluate: (
      drivers: Driver[],
      orders: Order[],
      depot: Depot,
      distanceMatrix: DistanceMatrix,
      config: EaEvaluateConfig
    ) => Promise<EaEvaluateResponse>;
    
    getComponentTypes: (
      componentType: EaComponentTypes
    ) => Promise<EaComponentDetails[]>;
  }
  
  
  