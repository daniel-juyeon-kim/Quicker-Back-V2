import compression from "compression";
import cors from "cors";
import express, { Application } from "express";
import morgan from "morgan";

import helmet from "helmet";
import { config } from "../config";
import { folder } from "../middlewares";
import { Env, isDevelopment } from "../util/env";

folder.createLogFolder();

export const middleware = {
  init: (app: Application) => {
    setUpDevelopMiddleware(app, config.nodeEnv);
    setUpCommonMiddleware(app);
  },
} as const;

const setUpDevelopMiddleware = (app: Application, nodeEnv: Env) => {
  if (isDevelopment(nodeEnv)) {
    app.use(morgan("combined"));
  }
};

const setUpCommonMiddleware = (app: Application) => {
  app.use(helmet());
  app.use(compression());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
};
