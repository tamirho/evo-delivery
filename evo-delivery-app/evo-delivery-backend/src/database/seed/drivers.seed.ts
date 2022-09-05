import { faker } from '@faker-js/faker';
import { Driver, Location } from '../../types';
import { fakeNearByLocation } from './utils';

const createDriver = () => {
  const driver: Partial<Driver> = {
    name: faker.name.fullName(),
    maxCapacity: faker.datatype.number({ min: 50, max: 5000 }),
    maxDistance: faker.datatype.number({ min: 50, max: 1000 }),
  };

  return driver;
};

export const seedDrivers = async (collection, numberOfItems: number) => {
  collection.drop();
  console.log('Drivers dropped...');

  const drivers: Partial<Driver>[] = [];

  for (let i = 0; i < numberOfItems; i++) {
    drivers.push(createDriver());
  }

  const result = await collection.insertMany(drivers);

  console.log('Drivers seeded...');
  return Object.values(result.insertedIds);
};
