import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

declare global {
  // eslint-disable-next-line no-var
  var cachedDbPool: Pool | undefined;
}

const connectionString = process.env.DATABASE_URL as string;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

const pool = global.cachedDbPool ?? new Pool({ connectionString });
if (!global.cachedDbPool) {
  global.cachedDbPool = pool;
}

export const db = drizzle(pool, { schema });
export type DbClient = typeof db;


