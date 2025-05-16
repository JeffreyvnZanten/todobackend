import express, { Request, Response } from "express";
import cors from "cors";

import { TodoTable } from "./db/schema/todo.schema";

import { asyncHandler, validateTodoInput } from "./helper";
import { db } from "./db";
import { createTodo } from "./todo.repository";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.json({ status: "get /: ok" });
});

app.get("/todos", async (req: Request, res: Response) => {
  const todos = await db.select().from(TodoTable);
  res.json(todos);
});

app.post(
  "/addtodo",
  asyncHandler(async (req: Request, res: Response) => {
    // Valideer de input data
    let todoInput;
    try {
      todoInput = validateTodoInput(req.body);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
      return;
    }

    // Maak de todo aan in de database
    const newTodo = await createTodo(todoInput);
    res.status(201).json(newTodo);
    return;
  })
);

export default app;
