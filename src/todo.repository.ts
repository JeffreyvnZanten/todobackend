import { db } from "./db";
import { TodoTable } from "./db/schema/todo.schema";
import { Todo } from "./todo.model";

export async function createTodo({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const result = await db
    .insert(TodoTable)
    .values({
      title,
      description,
      isCompleted: false,
    })
    .returning();
  return result;
}

export async function insertTestData() {
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

export async function getAllTodos() {
  try {
    const todos: Todo[] = await db.select().from(TodoTable);
    return todos;
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    throw error;
  }
}
