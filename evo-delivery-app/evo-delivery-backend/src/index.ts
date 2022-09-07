import express, { Express } from 'express';
import { json } from 'body-parser';
import 'dotenv/config';
import { apiRouter } from './routes';
import { createDbConnection } from './database';

const app: Express = express();
const PORT: string | number = process.env.PORT || 4000;

app.use(json());
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});

createDbConnection();
