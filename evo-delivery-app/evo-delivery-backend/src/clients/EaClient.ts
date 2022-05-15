import {
  DistanceMatrix,
  Driver,
  EaComponentDetails,
  EaComponentTypes,
  EaConfigParams,
  EaEvaluateHttpResponse,
  EaConfigParamsArgs,
  IdWithAddress,
  Order,
} from '../types';

export interface EaClient {
  evaluate: (
    drivers: Driver[],
    orders: Order[],
    rootAddress: IdWithAddress,
    distanceMatrix: DistanceMatrix,
    args?: EaConfigParams,
    kwargs?: EaConfigParamsArgs
  ) => Promise<EaEvaluateHttpResponse>;
  
  getComponentTypes: (
    componentType: EaComponentTypes
  ) => Promise<EaComponentDetails[]>;
}



