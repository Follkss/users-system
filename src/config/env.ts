import { config } from 'dotenv';

config();

export const ENV = Object.seal({
  PORT: process.env.PORT,
  DATABASE: Object.seal({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
  }),
});
