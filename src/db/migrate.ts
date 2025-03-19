import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const migrationClient = postgres(connectionString, { max: 1 });

export async function runMigrations() {
  try {
    await migrate(drizzle(migrationClient), {
      migrationsFolder: "./drizzle",
    });
    console.log("Migrations run successfully");
    await migrationClient.end();
  } catch (error) {
    console.error("Failed to run migrations:", error);
  }
}
