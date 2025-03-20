"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runMigrations = runMigrations;
require("dotenv/config");
const postgres_js_1 = require("drizzle-orm/postgres-js");
const migrator_1 = require("drizzle-orm/postgres-js/migrator");
const postgres_1 = __importDefault(require("postgres"));
const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const migrationClient = (0, postgres_1.default)(connectionString, { max: 1 });
async function runMigrations() {
    try {
        await (0, migrator_1.migrate)((0, postgres_js_1.drizzle)(migrationClient), {
            migrationsFolder: "./drizzle",
        });
        console.log("Migrations run successfully");
        await migrationClient.end();
    }
    catch (error) {
        console.error("Failed to run migrations:", error);
    }
}
