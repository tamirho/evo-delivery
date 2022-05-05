import 'dotenv/config'
import express, { Express } from 'express';
import { json } from 'body-parser';
import { apiRouter } from './routes';

const app: Express = express();

const PORT: string | number = process.env.PORT || 3000;
app.use(json());
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
