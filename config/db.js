import mongoose from 'mongoose';
import { config } from './config.js';
import { messages } from '../constants/messages.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri, {
    });
    console.log(messages.config.dbConnected);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
