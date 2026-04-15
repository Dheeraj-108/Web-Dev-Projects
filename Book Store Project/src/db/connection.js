import 'dotenv/config';

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set in .env file");
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 20,
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

const db = drizzle(pool);

export default db;