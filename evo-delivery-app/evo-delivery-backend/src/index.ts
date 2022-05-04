import express, { Express } from 'express';
import { json } from 'body-parser';
import { apiRouter } from './routes';
import mongoose from 'mongoose';
import Driver from './database/models/driver.model';
  
const app: Express = express();

const PORT: string | number = process.env.PORT || 3000;
app.use(json());
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});

connect()
async function connect () {
  await mongoose.connect("mongodb://localhost:27017/Test",{connectTimeoutMS: 3000},() => console.log("connected to database"))
}