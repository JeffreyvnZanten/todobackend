import express, { Request, Response } from "express";
import cors from "cors";

import { TodoTable } from "./db/schema/todo.schema";

import { asyncHandler, validateTodoInput } from "./helper";
import { db } from "./db";
import { createTodo, getAllTodos } from "./todo.repository";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (res: Response) => {
  res.json({ status: "get /: ok" });
});

app.get("/todos", async (res: Response) => {
  const todos = await getAllTodos();
  res.json(todos);
});

app.post("addtodo", async (req: Request, res: Response) => {
  try {
    createTodo(req.body);

    res.json({ status: "ok" });
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ error: "Failed to create todo" });
  }
});

export default app;
