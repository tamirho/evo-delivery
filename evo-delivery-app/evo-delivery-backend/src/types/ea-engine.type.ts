export enum EaComponentTypes {
  SELECTION = 'selection',
  FITNESS = 'fitness',
  MUTATE = 'mutate',
  CROSSOVER = 'crossover',
  STOP_CONDITION = 'stop_condition',
}

export type EaComponentKwargs = {
  name: string;
  type: string;
  description: string;
};

export type EaComponentDetails = {
  name: string;
  description: string;
  kwargs: EaComponentKwargs[];
};

export type EaDriverRoute = string[];

export type EaEvaluateResponse = {
  [driverId: string]: EaDriverRoute;
};

export type EaComponentConfig = {
  name: string;
  args: { [key: string]: any };
};

export type EaEvaluateConfig = {
  popSize?: number;
  crossoverProb?: number;
  mutateProb?: number;
  crossover?: EaComponentConfig;
  fitness?: EaComponentConfig;
  selection?: EaComponentConfig;
  mutate?: EaComponentConfig;
  stopCondition?: EaComponentConfig;
};
