export enum EaComponentTypes {
    SELECTION = 'selection',
    FITNESS = 'fitness',
    MUTATE = 'mutate',
    CROSSOVER = 'crossover',
}

export type EaComponentKwargs = {
    name: string,
    type: string,
    description: string,
}

export type EaComponentDetails = {
    name: string;
    description: string;
    kwargs: EaComponentKwargs[]
}