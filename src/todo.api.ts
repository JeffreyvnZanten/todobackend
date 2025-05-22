import { Request, Response, Router } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth";
import { fromNodeHeaders } from "better-auth/node";
import { createTodo, getAllTodos, getTodos } from "./todo.repository";

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

// app.patch("/api/todos/:id", async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { isCompleted } = req.body;

export default router;
