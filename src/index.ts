import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import "express-async-errors";
import "dotenv/config";

import "@shared/container";

import { router } from "./routes";
import { AppError } from "@shared/errors/AppError";

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.satusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(3333, async () => {
  console.log("Running on the port 3333!");
});
