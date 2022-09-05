import { faker } from '@faker-js/faker';
import { prepareDraft } from '../../services/draft.service';
import { Depot, Draft, DraftData, Driver, EaEvaluateConfig, Order } from '../../types';
import { createCrossover, createFitness, createMutate, createSelection, createStopCondition } from './ea-component-config-data';

type SeedDraftData = { depots: string[]; orders: string[]; drivers: string[] };

const createDraft = (data: SeedDraftData) => {
  const partialDraftData: Partial<DraftData> = {
    depot: faker.helpers.arrayElement(data.depots),
    orders: faker.helpers.arrayElements(data.orders),
    drivers: faker.helpers.arrayElements(data.drivers),
  };

  const crossover = createCrossover();
  const fitness = createFitness();
  const selection = createSelection();
  const mutate = createMutate();
  const stopCondition = createStopCondition();

  const partialDraftConfig: Partial<EaEvaluateConfig> = {
    popSize: faker.datatype.number({ min: 50, max: 5000, precision: 10 }),
    crossoverProb: faker.datatype.number({ min: 0.1, max: 0.9, precision: 0.05 }),
    mutateProb: faker.datatype.number({ min: 0.1, max: 0.9, precision: 0.05 }),
    ...(crossover ? { crossover } : {}),
    ...(fitness ? { fitness } : {}),
    ...(selection ? { selection } : {}),
    ...(mutate ? { mutate } : {}),
    ...(stopCondition ? { stopCondition } : {}),
  };

  const partialDraft: Partial<Draft> = {
    data: partialDraftData as any,
    config: partialDraftConfig,
  };

  return prepareDraft(partialDraft);
};

export const seedDrafts = async (collection, numberOfItems: number, data: SeedDraftData) => {
  collection.drop();
  console.log('Drafts dropped...');

  const draftsP: Promise<Partial<Draft>>[] = [];

  for (let i = 0; i < numberOfItems; i++) {
    draftsP.push(createDraft(data));
  }

  const drafts = await Promise.all(draftsP);
  const result = await collection.insertMany(drafts);

  console.log('Drafts seeded...');
  return Object.values(result.insertedIds);
};
