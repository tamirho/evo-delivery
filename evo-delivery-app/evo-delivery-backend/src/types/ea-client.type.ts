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
  root_id: string;
};

export type EaEvaluateHttpRequestBody = {
  draft_id: string;
  run_id: string,
  data: EaEvaluateHttpRequestData;
  config: EaEvaluateHttpRequestConfig;
};

export type EaHttpRequestComponentConfig = {
  name: string;
  args: { [key: string]: any };
};

export type EaEvaluateHttpRequestConfig = {
  pop_size?: number;
  crossover_prob?: number;
  mutate_prob?: number;
  num_generations?: number;
  crossover?: EaHttpRequestComponentConfig;
  fitness?: EaHttpRequestComponentConfig;
  selection?: EaHttpRequestComponentConfig;
  mutate?: EaHttpRequestComponentConfig;
};

export type EaEvaluateHttpResponse = {
  [driverId: string]: EaDriverRoute;
};
