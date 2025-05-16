import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const connectionString = process.env.DB_URL!;
const migrationClient = postgres(connectionString, { max: 1 });

async function runMigrations() {
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

runMigrations();
