"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoTable = exports.mySchema = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.mySchema = (0, pg_core_1.pgSchema)("my_schema");
exports.TodoTable = exports.mySchema.table("todo", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    isCompleted: (0, pg_core_1.boolean)("isCompleted").notNull(),
});
