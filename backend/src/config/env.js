
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const required = ['MONGODB_URI', 'SESSION_SECRET'];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

if (
  process.env.SESSION_SECRET.length < 32 ||
  process.env.SESSION_SECRET === 'dev_perfomatrix_secret_key_change_in_prod'
) {
  throw new Error('SESSION_SECRET must be a strong, random secret');
}

export const ENV = {
  PORT: Number(process.env.PORT || 5000),
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_PREFIX: process.env.API_PREFIX || '/api/v1',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
  MONGODB_URI: process.env.MONGODB_URI,
  SESSION_SECRET: process.env.SESSION_SECRET,
  SESSION_MAX_AGE_MS: 8 * 60 * 60 * 1000,
  IS_PRODUCTION: isProduction,
};
