import express, { Request, Response } from "express";
import { drizzle } from "drizzle-orm/postgres-js";
import "dotenv/config";
import { sql } from "drizzle-orm";
import postgres from "postgres";
import { TodoTable } from "../db/schema";
import { runMigrations } from "../db/migrate";

const app = express();
app.use(express.json());

// Create a PostgreSQL client with proper configuration
const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
console.log(`Connecting to database with: ${connectionString}`);

const client = postgres(connectionString, { ssl: false });
const db = drizzle(client);

app.get("/", async (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

  // runMigrations();
  insertTestData();
});

async function insertTestData() {
  try {
    console.log("Inserting test data...");
    const result = await db
      .insert(TodoTable)
      .values({
        title: "Test Todo",
        description: "This is a test todo item",
        isCompleted: false,
      })
      .returning();
    console.log("Test data inserted:", result);
  } catch (error) {
    console.error("Failed to insert test data:", error);
  }
}
