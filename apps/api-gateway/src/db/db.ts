import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://postgres:postgrespassword@localhost:5432/agevine",
});

export const db = drizzle(pool, { schema });
