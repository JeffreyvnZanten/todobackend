import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const connectionString = process.env.DB_URL!;
const migrationClient = postgres(connectionString, { max: 1 });

async function runMigrations() {
  try {
    // Probeer eerst de standaard Drizzle migrate functie
    await migrate(drizzle(migrationClient), {
      migrationsFolder: "./drizzle",
    });
    console.log("Migrations run successfully");
  } catch (error: any) {
    // Als het een "schema already exists" error is, negeer het
    if (error.code === "42P06") {
      console.log("Schema already exists, skipping migration");
    } else if (error.code === "42P07") {
      console.log("Table already exists, skipping migration");
    } else {
      // Voor andere errors, log en ga door
      console.warn("Migration warning (continuing):", error.message);
    }
  } finally {
    await migrationClient.end();
  }
}

runMigrations();
