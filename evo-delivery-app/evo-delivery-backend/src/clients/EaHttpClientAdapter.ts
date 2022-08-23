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
  evaluate: (
    drivers: Driver[],
    orders: Order[],
    depot: Depot,
    draftId: string,
    runId: string,
    distanceMatrix: DistanceMatrix,
    config: EaEvaluateConfig
  ) => Promise<EaEvaluateResponse>;

  getComponentDetails: (
    componentType: EaComponentTypes
  ) => Promise<EaComponentDetails[]>;

  terminate: (run_id: string) => Promise<void>;
}
