import compression from "compression";
import cors from "cors";
import express, { Application } from "express";
import morgan from "morgan";

import { config } from "../config";
import { cronJob, folder } from "../middlewares";
import { isDevelopment } from "../util/env";

folder.createLogFolder();
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
cronJob;

const setUpMiddleware = (app: Application) => {
  setUpDevelopMiddleware(app);

  app.use(compression());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
};

const setUpDevelopMiddleware = (app: Application) => {
  const nodeEnv = config.nodeEnv;

  if (isDevelopment(nodeEnv)) {
    app.use(morgan("combined"));
  }
};

export default setUpMiddleware;
