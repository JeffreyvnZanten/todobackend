import "dotenv/config";
import app from "./todo.api";
import { resetTable } from "./todo.repository";

const port = parseInt(process.env.PORT ?? "3000", 10);

// resetTable();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
