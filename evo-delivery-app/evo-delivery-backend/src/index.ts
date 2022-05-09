import 'dotenv/config';
import express, { Express } from 'express';
import { json } from 'body-parser';
import { apiRouter } from './routes';
import { eaClient, googleMatrixClient } from './clients';
import { EaComponentTypes } from './types';
import { DRIVERS, ORDERS } from './services/tmp-data';

const app: Express = express();

const PORT: string | number = process.env.PORT || 3000;
app.use(json());
app.use('/api', apiRouter);

app.get('/test', async (req, res) => {
	console.log('googleMatrixClient');
	const distanceMatrix = await googleMatrixClient.getDistance(ORDERS as any, ORDERS as any);
  console.log('eaClient.evaluate');
	const response = await eaClient.evaluate(DRIVERS as any, ORDERS as any, distanceMatrix);
	console.log(response);
	res.send(response);
});

app.listen(PORT, () => {
	console.log(`server is listening on port ${PORT}`);
});
