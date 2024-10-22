import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import { appRouter } from "./router";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(appRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
