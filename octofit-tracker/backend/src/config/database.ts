import mongoose from 'mongoose';
import { MONGO_URI } from '../config';

// Database name used by the application
export const DB_NAME = process.env.DB_NAME ?? 'octofit_db';

export async function connect() {
  await mongoose.connect(MONGO_URI);
  return mongoose;
}

export async function disconnect() {
  await mongoose.disconnect();
}
