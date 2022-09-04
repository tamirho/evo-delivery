export enum EaComponentTypes {
  SELECTION = 'selection',
  FITNESS = 'fitness',
  MUTATE = 'mutate',
  CROSSOVER = 'crossover',
  STOP_CONDITION = 'stopCondition',
}

export const convertObjToNiceText = (obj: object): string =>
  Object.entries(obj)
    .filter(([_, v]: any[]) => v !== null && v !== '' && !isNaN(v))
    .map(([k, v]) => `${k}: ${v}`)
    .join(', ');
