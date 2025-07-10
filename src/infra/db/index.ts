import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema/index.js';
import { env } from '@/shared/env.js';

export const client = postgres(env.DATABASE_URL);
export const db = drizzle(client, {
  schema,
  logger: env.NODE_ENV === 'development',
});
