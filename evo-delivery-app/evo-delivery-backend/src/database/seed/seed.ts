import 'dotenv/config';
import mongoose from 'mongoose';
import { closeDbConnection, createDbConnection } from '..';
import { seedDepots } from './depots.seed';
import { seedDrafts } from './drafts.seed';
import { seedDrivers } from './drivers.seed';
import { seedEvaluateResults } from './evaluate-results.seed';
import { seedOrders } from './orders.seed';

export const seed = async () => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      await createDbConnection();
      console.log('Seeding database...');

      const depotsCollection = mongoose.connection.db.collection('Depots');
      const ordersCollection = mongoose.connection.db.collection('Orders');
      const driversCollection = mongoose.connection.db.collection('Drivers');
      const draftsCollection = mongoose.connection.db.collection('Drafts');
      const evaluateResultsCollection = mongoose.connection.db.collection('EvaluateResults');

      const depots = await seedDepots(depotsCollection, 5);
      const orders = await seedOrders(ordersCollection, 5);
      const drivers = await seedDrivers(driversCollection, 5);
      await seedDrafts(draftsCollection, 2, { depots, orders, drivers } as any);
      await seedEvaluateResults(evaluateResultsCollection);

      console.log('Database seeded! :)');
    }
  } catch (err) {
    console.log(err);
  }
};
