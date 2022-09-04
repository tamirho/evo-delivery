import { faker } from '@faker-js/faker';
import { Depot, Location } from '../../types';
import { fakeNearByLocation } from './utils';

const createDepot = async () => {
  const location: Location = await fakeNearByLocation();
  const depot: Partial<Depot> = {
    ...location,
    name: faker.company.name(),
  };

  return depot;
};

export const seedDepots = async (collection, numberOfItems: number) => {
  collection.drop();
  console.log('Depots dropped...');

  const depotsP: Promise<Partial<Depot>>[] = [];

  for (let i = 0; i < numberOfItems; i++) {
    depotsP.push(createDepot());
  }

  const depots = await Promise.all(depotsP);
  const result = await collection.insertMany(depots);

  console.log('Depots seeded...');
  return Object.values(result.insertedIds);
}
