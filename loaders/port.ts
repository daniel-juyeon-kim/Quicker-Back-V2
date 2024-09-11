import chalk from "chalk";
import { Application } from "express";

import { isPositiveNumber } from "../util";
import { Env, validateEnvValue } from "../util/env";

export const port = {
  init: (app: Application, port: Env) => {
    validate(port);

    return app.listen(port, showServerPort(port));
  },
} as const;

type Validate = (port: Env) => asserts port is `${number}`;

const validate: Validate = (port) => {
  validateEnvValue("port", port);
  validatePort(port);
};

const validatePort = (port: string) => {
  const ERROR_MESSAGE = `[WARN] Port must be a positive numeric string`;

  if (isPositiveNumber(parseInt(port))) {
    return;
  }
  throw new Error(ERROR_MESSAGE);
};

const showServerPort = (port: string) => {
  const MESSAGE = `[RUNNING] App is listening on port ${port} !`;

  return () => console.log(chalk.blueBright(MESSAGE));
};
