import 'dotenv/config'
import express, { Express } from 'express';
import { json } from 'body-parser';
import { apiRouter } from './routes';
import { eaClient } from './clients';
import { EaComponentTypes } from './types';

const app: Express = express();

const PORT: string | number = process.env.PORT || 3000;
app.use(json());
app.use('/api', apiRouter);

app.get('/test', async (req, res) => {

  console.log("Fetch types from ea server");
  const response = await eaClient.getComponentTypes(EaComponentTypes.CROSSOVER);
  console.log(response);
  res.send(response);
})

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
