import { EaDriverRoute } from './ea-engine.type';

export type EaHttpRequestOrder = {
  id: string;
  weight: number;
};

export type EaHttpRequestDriver = {
  id: string;
  max_capacity: number;
  max_distance: number;
};

export type EaHttpRequestDistancesColData = number;

export type EaHttpRequestDistancesRowData = {
  [to: string]: EaHttpRequestDistancesColData;
};

export type EaHttpRequestDistances = {
  [from: string]: EaHttpRequestDistancesRowData;
};

export type EaEvaluateHttpRequestData = {
  drivers: EaHttpRequestDriver[];
  orders: EaHttpRequestOrder[];
  distances: EaHttpRequestDistances;
};

export type EaEvaluateHttpRequestKwargs = {
  crossover_kwargs?: {};
  mutate_kwargs?: {};
  selection_kwargs?: {};
  fitness_kwargs?: {};
};

export type EaEvaluateRequestBody = {
  data: EaEvaluateHttpRequestData;
  kwargs: EaEvaluateHttpRequestKwargs;
};

export type EaEvaluateHttpRequestArgs = {
  crossover?: string;
  mutate?: string;
  selection?: string;
  fitness?: string;
  pop_size?: number;
  cxpb?: number;
  mutpd?: number;
  num_generations?: number;
};

export type EaEvaluateHttpResponse = {
  [driverId: string]: EaDriverRoute;
};
