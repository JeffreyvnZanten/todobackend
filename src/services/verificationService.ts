import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

const WHITELIST = (process.env.WHITELIST ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export function checkEmailWhitelist(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.log("whitelist triggered, toegestaan:", WHITELIST);
  const email = (req.body.email ?? "").toLowerCase();
  if (!WHITELIST.includes(email)) {
    res.status(403).json({ error: "E-mail niet toegestaan op dit platform." });
    return;
  }
}
