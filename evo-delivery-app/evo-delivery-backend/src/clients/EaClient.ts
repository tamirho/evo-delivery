import {
  DistanceMatrix,
  Driver,
  EaComponentDetails,
  EaComponentTypes,
  EaEvaluateArgs,
  EaEvaluateHttpResponse,
  EaEvaluateKwargs,
  Order,
} from '../types';

export interface EaClient {
  evaluate: (
    drivers: Driver[],
    orders: Order[],
    distanceMatrix: DistanceMatrix,
    args?: EaEvaluateArgs,
    kwargs?: EaEvaluateKwargs
  ) => Promise<EaEvaluateHttpResponse>;
  getComponentTypes: (
    componentType: EaComponentTypes
  ) => Promise<EaComponentDetails[]>;
}
