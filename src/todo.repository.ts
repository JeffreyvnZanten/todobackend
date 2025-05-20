import { sql, eq } from "drizzle-orm";
import { db } from "./db";
import { TodoTable } from "./db/schema/todo.schema";
import { Todo } from "./todo.model";

export async function createTodo(data: typeof TodoTable.$inferInsert) {
  try {
    const result = await db
      .insert(TodoTable)
      .values({
        title: data.title,
        isCompleted: data.isCompleted,
      })
      .returning();
    console.log("Test data inserted:", result);
  } catch (error) {
    console.error("Failed to create todo:", error);
    throw error;
  }
}

export async function resetTable() {
  try {
    await db.execute(
      sql`TRUNCATE TABLE "my_schema"."todo" RESTART IDENTITY CASCADE;`
    );
  } catch (error) {
    console.error("Failed to reset table:", error);
    throw error;
  }
}

export async function insertTestData() {
  try {
    console.log("Inserting test data...");
    const result = await db
      .insert(TodoTable)
      .values({
        title: "Test Todo",
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

export async function getAllCompletedTodos() {
  try {
    const todos: Todo[] = await db
      .select()
      .from(TodoTable)
      .where(eq(TodoTable.isCompleted, true));
    return todos;
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    throw error;
  }
}

export async function getAllUnCompletedTodos() {
  try {
    const todos: Todo[] = await db
      .select()
      .from(TodoTable)
      .where(eq(TodoTable.isCompleted, false));
    return todos;
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    throw error;
  }
}

export async function getTodos(completed?: boolean): Promise<Todo[]> {
  const query = db.select().from(TodoTable);
  if (completed !== undefined) {
    query.where(eq(TodoTable.isCompleted, completed));
  }
  return query;
}

export async function markTodoAsCompleted(id: number) {
  try {
    await db
      .update(TodoTable)
      .set({ isCompleted: true })
      .where(eq(TodoTable.id, id))
      .returning();
  } catch (error) {
    console.error("Failed to mark todo as completed:", error);
    throw error;
  }
}
