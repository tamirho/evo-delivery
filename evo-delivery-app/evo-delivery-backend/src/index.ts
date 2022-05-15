import 'dotenv/config';
import express, { Express } from 'express';
import { json } from 'body-parser';
import { apiRouter } from './routes';
import { eaClient, googleMatrixClient } from './clients';
import { EaComponentTypes } from './types';
import { DRIVERS, ORDERS } from './models/tmp-data';

const app: Express = express();

const PORT: string | number = process.env.PORT || 3000;
app.use(json());
app.use('/api', apiRouter);

// test - should be removed
app.get('/test', async (req, res) => {
  const rootAddress = {
    id: '0',
    address: 'Lod',
  };

  const ordersAndStart = [...ORDERS, rootAddress];

  const distanceMatrix = await googleMatrixClient.getDistance(
    ordersAndStart as any,
    ordersAndStart as any
  );

  const response = await eaClient.evaluate(
    DRIVERS as any,
    ORDERS as any,
    rootAddress,
    distanceMatrix,
    { selection: 'best', numGenerations: 5000, crossover: "two_points"},
    { }
  );

  res.send(response);
});

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
