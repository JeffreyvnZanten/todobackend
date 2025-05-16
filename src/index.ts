import "dotenv/config";
import { getAllTodos, insertTestData } from "./todo.repository";
import app from "./todo.api";
import { db } from "./db";

const port = parseInt(process.env.PORT ?? "3000", 10);

async function todoTest() {
  const todos = await getAllTodos();
  console.log("Todos:", todos);
}

insertTestData();

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
  console.log(db);
  todoTest();
});
