import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";

dotenv.config();
const app: Express = express();
app.use(cors());

app.listen(process.env.PORT, () => {
  console.log("Server is listening on port ", process.env.PORT);
});
