import express, { Request, Response } from "express";
import cors from "cors";

import { TodoTable } from "./db/schema/todo.schema";

import { asyncHandler, validateTodoInput } from "./helper";
import { db } from "./db";
import { createTodo, getAllTodos, getTodos } from "./todo.repository";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.json({ status: "get /: ok" });
});

app.get("/todos", async (req: Request, res: Response) => {
  try {
    // req.query.completed is string | undefined
    const completedParam = req.query.completed as string | undefined;

    // completed === 'true' → true; 'false' → false; anders undefined
    const completed =
      completedParam === "true"
        ? true
        : completedParam === "false"
        ? false
        : undefined;

    const todos = await getTodos(completed);
    res.json(todos);
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/addtodo", async (req: Request, res: Response) => {
  try {
    createTodo(req.body);
    res.status(201).json({ message: "Todo created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create todo", error });
  }
});

export default app;
