import express, { Request, Response } from "express";
import cors from "cors";

import { TodoTable } from "./db/schema/todo.schema";

import { asyncHandler, validateTodoInput } from "./helper";
import { db } from "./db";
import { createTodo, getAllTodos } from "./todo.repository";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.json({ status: "get /: ok" });
});

app.get("/todos", async (res: Response) => {
  const todos = await getAllTodos();
  res.json(todos);
});

export default app;
