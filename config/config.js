import dotenv from 'dotenv';

dotenv.config();

export const config = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiry: process.env.JWT_EXPIRY || '1h',
  mongoUri: process.env.MONGO_URI,
  port: process.env.PORT || 5000,
};
