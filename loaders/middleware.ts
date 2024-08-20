import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express, { Application } from "express";
import morgan from "morgan";

import { cronJob, folder } from "../middlewares";

folder.createLogFolder();
cronJob;

const setUpMiddleware = (app: Application) => {
  executeDevelopMiddleware(app);

  app.use(compression());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};

const executeDevelopMiddleware = (app: Application) => {
  const isDevelopment = process.env.NODE_ENV === "development" ? process.env.NODE_ENV : "production";

  if (isDevelopment) {
    app.use(morgan("combined"));
  }
};

export default setUpMiddleware;
