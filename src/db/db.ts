import 'dotenv/config';
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { schema } from "./schema.ts";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const db = drizzle({ client: pool, schema });