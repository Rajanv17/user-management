import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./config/database";
import apiRoutes from "./routes";
import * as dotenv from "dotenv";
import { ApiError, errorHandler } from "./utils/ApiError";

const app = express();

app.use(express.json());
dotenv.config();

app.use("/api", apiRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });

app.use(
  (
    err: Error | ApiError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    errorHandler(err, req, res, next);
  }
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
