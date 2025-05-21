import "dotenv/config";
import { resetTable } from "./todo.repository";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth";
import express from "express";
import router from "./todo.api";

const app = express();
const port = parseInt(process.env.PORT ?? "3000", 10);

resetTable();

app.all("/api/auth/*", toNodeHandler(auth));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/v1", router);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
