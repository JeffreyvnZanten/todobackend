import { Request, Response, NextFunction } from "express";

const WHITELIST = ["test@example.com"];

export function checkEmailWhitelist(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const email = (req.body.email ?? "").toLowerCase();
  if (!WHITELIST.includes(email)) {
    res.status(403).json({ error: "E-mail niet toegestaan op dit platform." });
    return;
  }
  next();
}
