import { Request, Response, NextFunction } from "express";

// Helper: Converteer Express headers naar een Fetch Headers object
export function convertToFetchHeaders(headers: Request["headers"]): Headers {
  const fetchHeaders = new Headers();
  for (const [key, value] of Object.entries(headers)) {
    if (value) {
      fetchHeaders.append(key, Array.isArray(value) ? value.join(", ") : value);
    }
  }
  return fetchHeaders;
}

// Async handler wrapper om asynchrone errors af te handelen
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// Helper: Valideer de todo input vanuit de request body
export function validateTodoInput(body: any): {
  title: string;
  description: string;
} {
  const { title, description } = body;
  if (!title || !description) {
    throw new Error("Titel en beschrijving zijn verplicht.");
  }
  return { title, description };
}
