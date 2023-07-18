import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const DATABASE_URI = process.env.DATABASE_URI;

if (!DATABASE_URI) {
  console.error('"DATABASE_URI" is requried.');
  process.exit(1);
}

const client = postgres(DATABASE_URI);

export const db = drizzle(client);
