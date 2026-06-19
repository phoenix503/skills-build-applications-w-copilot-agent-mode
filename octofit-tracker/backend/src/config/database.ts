import mongoose from 'mongoose';
import { MONGO_URI } from '../config';

export async function connect() {
  await mongoose.connect(MONGO_URI);
  return mongoose;
}

export async function disconnect() {
  await mongoose.disconnect();
}
