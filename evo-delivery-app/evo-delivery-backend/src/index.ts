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
run()
//f()
async function connect () {
  await mongoose.connect("mongodb://localhost:27017/Test",{connectTimeoutMS: 3000},() => console.log("connected to database"))
}

async function run() {
  const driver= await new Driver({
    name:"aaddsaa",
    maxCapacity:23,
    maxLength:34})
  
  await driver.save()
  console.log(driver)
}

async function f(){
  const found = await Driver.find({name:"tamir"})
  console.log(found)
  console.log(found[4].id)
}