import { faker } from '@faker-js/faker';
import { Order, Location } from '../../types';
import { fakeNearByLocation } from './utils';

const createOrder = async () => {
  const location: Location = await fakeNearByLocation();
  const order: Partial<Order> = {
    ...location,
    shippingDate: faker.date.soon(30).toDateString(),
    weight: faker.datatype.number({ min: 10, max: 500, precision: 1 }),
  };

  return order;
};

export const seedOrders = async (collection, numberOfItems: number) => {
  collection.drop();
  console.log('Orders dropped...');

  const ordersP: Promise<Partial<Order>>[] = [];

  for (let i = 0; i < numberOfItems; i++) {
    ordersP.push(createOrder());
  }

  const orders: Partial<Order>[] = [];
  const batchSize = 10;

  while (ordersP.length) { 
    // batching async fetch requests
    orders.push(...(await Promise.all(ordersP.splice(0, batchSize))));
  }

  const result = await collection.insertMany(orders);

  console.log('Orders seeded...');
  return Object.values(result.insertedIds);
};
