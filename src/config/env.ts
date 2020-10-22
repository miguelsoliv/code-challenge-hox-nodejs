import 'dotenv/config';

export const {
  NODE_ENV = 'dev',
  SHOW_DATABASE_ERRORS = true,
  JWT_SECRET = 'some-secret',
  JWT_EXPIRES_IN = '24h',
} = process.env;
