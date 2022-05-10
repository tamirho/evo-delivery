export type EaEvaluateArgs = {
  crossover?: string;
  mutate?: string;
  selection?: string;
  fitness?: string;
  popSize?: number;
  cxpb?: number;
  mutpd?: number;
  numGenerations?: number;
};

export type EaEvaluateKwargs = {
  crossoverKwargs?: {};
  mutateKwargs?: {};
  selectionKwargs?: {};
  fitnessKwargs?: {};
};

export enum EaComponentTypes {
  SELECTION = 'selection',
  FITNESS = 'fitness',
  MUTATE = 'mutate',
  CROSSOVER = 'crossover',
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
