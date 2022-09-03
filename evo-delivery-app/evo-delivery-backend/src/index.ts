import express, { Express } from 'express';
import { json } from 'body-parser';
import { apiRouter } from './routes';
import mongoose from 'mongoose';
import 'dotenv/config';
import {googleMatrixClient, eaHttpClientAdapter} from './clients';
import {DRIVERS, ORDERS} from './tmp/tmp-data';

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;
app.use(json());
app.use('/api', apiRouter);

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});

dbConnect()

async function dbConnect () {
    const mongo = process.env.MONGO_URI as string;
    await mongoose.connect(mongo, {connectTimeoutMS: 3000},
        (e) => {if (e) console.log(e.message);
                else console.log("Connected to DB")})
}