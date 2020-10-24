import 'dotenv/config';

declare let process: {
  env: {
    NODE_ENV: 'prod' | 'dev' | 'test';
    SHOW_DATABASE_ERRORS: boolean;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    DB_TYPE: 'mysql' | 'postgres' | 'oracle' | 'mongodb';
    DB_HOST: string;
    DB_PORT: number;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_NAME: string;
  };
};

export const {
  NODE_ENV = 'dev',
  SHOW_DATABASE_ERRORS = true,
  JWT_SECRET = 'some-secret',
  JWT_EXPIRES_IN = '24h',
  DB_TYPE = 'postgres',
  DB_HOST = 'localhost',
  DB_PORT = 5432,
  DB_USERNAME = 'postgres',
  DB_PASSWORD = 'hox',
  DB_NAME = 'postgres',
} = process.env;
