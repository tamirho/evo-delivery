import mongoose from 'mongoose';
import 'dotenv/config';

export const createDbConnection = async () => {
  if (mongoose.connection.readyState !== 1) {
    const mongoURI = process.env.MONGO_URI as string;
    await mongoose.connect(mongoURI, { connectTimeoutMS: 3000 }, (e) => {
      if (e) console.log(e.message);
      else console.log('DB Connected Successfully');
    });
  }
};

export const closeDbConnection = async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.close((e) => {
      if (e) console.log(e.message);
      else console.log('DB Disconnected Successfully');
    });
  }
};
