import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DB_URL!;
console.log(`Connecting to database with: ${connectionString}`);

const client = postgres(connectionString, { ssl: false });
export const db = drizzle(client);
