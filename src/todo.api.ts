import { NextFunction, Request, Response, Router } from "express";
import { auth } from "./auth";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import {
  createTodo,
  getAllTodos,
  getTodos,
  updateTodo,
} from "./todo.repository";
import { Todo } from "./todo.model";

const router = Router();

router.get("/todos", async (req: Request, res: Response) => {
  try {
    const completedParam = req.query.completed as string | undefined;
    console.log("completedParam", completedParam);

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

router.post("/addtodo", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session?.user) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  await createTodo(req.body);
  res.status(201).json({ message: "Todo created successfully" });
});

router.patch("/todos/:id", async (req: Request, res: Response) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session?.user) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const todoId = parseInt(req.params.id, 10);
  const updates: Partial<Todo> = req.body;
  try {
    const updated = await updateTodo(todoId, updates);
    if (updated) {
      res.json(updated);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (err) {
    console.error("Failed to update todo:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
