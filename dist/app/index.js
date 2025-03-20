"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postgres_js_1 = require("drizzle-orm/postgres-js");
require("dotenv/config");
const postgres_1 = __importDefault(require("postgres"));
const schema_1 = require("../db/schema");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Create a PostgreSQL client with proper configuration
const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
console.log(`Connecting to database with: ${connectionString}`);
const client = (0, postgres_1.default)(connectionString, { ssl: false });
const db = (0, postgres_js_1.drizzle)(client);
app.get("/", async (req, res) => {
    res.json({ status: "get /: ok" });
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
            .insert(schema_1.TodoTable)
            .values({
            title: "Test Todo",
            description: "This is a test todo item",
            isCompleted: false,
        })
            .returning();
        console.log("Test data inserted:", result);
    }
    catch (error) {
        console.error("Failed to insert test data:", error);
    }
}
