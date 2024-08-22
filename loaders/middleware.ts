import compression from "compression";
import cors from "cors";
import express, { Application } from "express";
import morgan from "morgan";

import config from "../config";
import { cronJob, folder } from "../middlewares";
import { isDevelopment } from "../util";

folder.createLogFolder();
cronJob;

const NODE_ENV = config.nodeEnv;

const setUpMiddleware = (app: Application) => {
  setUpDevelopMiddleware(app);

  app.use(compression());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
};

const setUpDevelopMiddleware = (app: Application) => {
  if (isDevelopment(NODE_ENV)) {
    app.use(morgan("combined"));
  }
};

export default setUpMiddleware;
