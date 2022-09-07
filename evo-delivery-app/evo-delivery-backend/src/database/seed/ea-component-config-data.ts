import { faker } from '@faker-js/faker';
import { EaComponentConfig } from '../../types';

export const createCrossover = () => {
  const fakeCrossover: (EaComponentConfig | null)[] = [
    { name: 'single_point', args: {} },
    { name: 'two_points', args: {} },
    {
      name: 'uniform',
      args: { indpb: faker.datatype.number({ min: 0.1, max: 0.9, precision: 0.05 }) },
    },
    // { name: 'blend', args: { alpha: faker.datatype.number({ min: 0.1, max: 2, precision: 0.01 }) } },
    null,
  ];

  return faker.helpers.arrayElement(fakeCrossover);
};

export const createFitness = () => {
  const fakeFitness: (EaComponentConfig | null)[] = [
    {
      name: 'bounded_distance',
      args: { distance: faker.datatype.number({ min: 200, max: 10000, precision: 50 }) },
    },
    {
      name: 'power',
      args: { power: faker.datatype.number({ min: 2, max: 8, precision: 1 }) },
    },
    null,
  ];

  return faker.helpers.arrayElement(fakeFitness);
};

export const createSelection = () => {
  const fakeSelection: (EaComponentConfig | null)[] = [
    {
      name: 'tournament',
      args: { tournsize: faker.datatype.number({ min: 20, max: 100, precision: 5 }) },
    },
    { name: 'roulette', args: {} },
    { name: 'random', args: {} },
    { name: 'best', args: {} },
    { name: 'worst', args: {} },
    null,
  ];

  return faker.helpers.arrayElement(fakeSelection);
};

export const createMutate = () => {
  const fakeMutate: (EaComponentConfig | null)[] = [
    {
      name: 'shuffle',
      args: { indpb: faker.datatype.number({ min: 0.1, max: 0.9, precision: 0.05 }) },
    },
    { name: 'flip_bit', args: { indpb: faker.datatype.number({ min: 0.1, max: 0.9, precision: 0.05 }) } },
    null,
  ];

  return faker.helpers.arrayElement(fakeMutate);
};

export const createStopCondition = () => {
  const fakeStopConditions: (EaComponentConfig | null)[] = [
    { name: 'time', args: { time_bound: faker.datatype.number({ min: 60, max: 600, precision: 10 }) } },
    {
      name: 'generations',
      args: { generations_bound: faker.datatype.number({ min: 1000, max: 10000, precision: 10 }) },
    },
    { name: 'fitness', args: { fitness_bound: faker.datatype.number({ min: 0.1, max: 2, precision: 0.01 }) } },
    null,
  ];

  return faker.helpers.arrayElement(fakeStopConditions);
};
