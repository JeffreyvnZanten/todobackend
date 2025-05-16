import "dotenv/config";
import app from "./todo.api";

const port = parseInt(process.env.PORT ?? "3000", 10);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
