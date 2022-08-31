import { Driver, Order, Depot, EaComponentConfig } from '@backend/types';

export type StringObj = {
    [x: string]: StringObj
}

export type DraftFormValues = {
  data: { drivers: Driver[]; orders: Order[]; depot: Depot | null };
  config: {
    popSize: number;
    crossoverProb: number;
    mutateProb: number;
    crossover: { enabled: boolean } & EaComponentConfig;
    fitness: { enabled: boolean } & EaComponentConfig;
    selection: { enabled: boolean } & EaComponentConfig;
    mutate: { enabled: boolean } & EaComponentConfig;
    stopCondition: { enabled: boolean } & EaComponentConfig;
  };
};
