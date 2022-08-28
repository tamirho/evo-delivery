import {
  EaComponentDetails,
  EaComponentTypes,
  EaEvaluateResponse,
  Driver,
  Order,
  Depot,
  DistanceMatrix,
  EaEvaluateConfig,
} from "../types";

export interface EaHttpClientAdapter {
  evaluateWithReturn: (
    drivers: Driver[],
    orders: Order[],
    depot: Depot,
    distanceMatrix: DistanceMatrix,
    config: EaEvaluateConfig
  ) => Promise<EaEvaluateResponse>;

  evaluateWithUpdate: (
    drivers: Driver[],
    orders: Order[],
    depot: Depot,
    runId: string,
    distanceMatrix: DistanceMatrix,
    config: EaEvaluateConfig
  ) => Promise<void>;

  getComponentDetails: (
    componentType: EaComponentTypes
  ) => Promise<EaComponentDetails[]>;

  terminate: (run_id: string) => Promise<void>;
}
