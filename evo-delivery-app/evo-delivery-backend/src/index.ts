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

// // test - should be removed
// app.get('/test', async (req, res) => {
//     const rootAddress = {
//         id: '0',
//         address: 'Lod',
//     };

//     const config = {
//         selection: {
//             name: 'best',
//             args: {}
//         }
//     }

//     const ordersAndStart = [...ORDERS, rootAddress];

//     const distanceMatrix = await googleMatrixClient.getDistance(
//         ordersAndStart as any,
//         ordersAndStart as any
//     );

//     const response = await eaHttpClientAdapter.evaluate(
//         DRIVERS as any,
//         ORDERS as any,
//         rootAddress as any,
//         distanceMatrix,
//         config
//     );

//     res.send(response);
// });

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