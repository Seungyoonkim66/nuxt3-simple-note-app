// import { migrate } from 'drizzle-orm/node-postgres/migrator';
// import { drizzle } from 'drizzle-orm/postgres-js';
// import * as postgres from 'postgres';

/* Nuxt와 완전히 무관한 파일 */

const { migrate } = require('drizzle-orm/node-postgres/migrator');
const { drizzle } = require('drizzle-orm/postgres-js');
const postgres = require('postgres');

require('dotenv').config();// process.env.DATABASE_URI 사용하기 위해 필요

const connectionString = process.env.DATABASE_URI; // 이걸 사용하기 위해서는 'dotenv'가 필요함 
const client = postgres(connectionString);
const db = drizzle(client);

migrate(db, { migrationsFolder: 'server/db/migrations' })
.then(() => {
  console.log('Migration complete!');
  process.exit(0); // TODO: 에러일 때는 1을 준다는데 왜 그런지 알아보기
}).catch((err: any) => {
  console.error('Migrations failed!', err);
  process.exit(1);
});

