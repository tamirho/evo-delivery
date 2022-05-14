import {
  DistanceMatrix,
  Driver,
  EaComponentDetails,
  EaComponentTypes,
  EaEvaluateArgs,
  EaEvaluateHttpResponse,
  EaEvaluateKwargs,
  IdWithAddress,
  Order,
} from '../types';

export interface EaClient {
  evaluate: (
    drivers: Driver[],
    orders: Order[],
    rootAddress: IdWithAddress,
    distanceMatrix: DistanceMatrix,
    args?: EaEvaluateArgs,
    kwargs?: EaEvaluateKwargs
  ) => Promise<EaEvaluateHttpResponse>;
  
  getComponentTypes: (
    componentType: EaComponentTypes
  ) => Promise<EaComponentDetails[]>;
}
