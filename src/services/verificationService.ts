import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

const WHITELIST = process.env.WHITELIST || "";

function filteredWhiteList() {
  const filteredWhiteList = WHITELIST.split(",").map((e) =>
    e.trim().toLowerCase()
  );

  return filteredWhiteList;
}
export function checkEmailWhitelist(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.log("whitelist triggered, toegestaan:", WHITELIST);
  const email = (req.body.email ?? "").toLowerCase();
  if (!filteredWhiteList().includes(email)) {
    res.status(403).json({ error: "E-mail niet toegestaan op dit platform." });
    return;
  }
  next();
}
