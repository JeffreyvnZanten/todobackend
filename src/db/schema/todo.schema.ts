import { serial, text, pgTable, pgSchema, boolean } from "drizzle-orm/pg-core";

export const mySchema = pgSchema("my_schema");

export const TodoTable = mySchema.table("todo", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  isCompleted: boolean("isCompleted").notNull(),
});
