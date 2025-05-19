import express, { Request, Response } from "express";
import cors from "cors";

import { createTodo, getAllTodos, getTodos } from "./todo.repository";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/v1/todos", async (req: Request, res: Response) => {
  try {
    const completedParam = req.query.completed as string | undefined;

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

app.post("/api/v1/addtodo", async (req: Request, res: Response) => {
  try {
    createTodo(req.body);
    res.status(201).json({ message: "Todo created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create todo", error });
  }
});

// app.patch("/api/todos/:id", async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { isCompleted } = req.body;

export default app;
