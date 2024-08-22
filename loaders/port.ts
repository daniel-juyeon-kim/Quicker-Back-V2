import chalk from "chalk";
import { Application } from "express";
import { isPositiveNumber, isUndefined } from "../util";

const initializePort = (app: Application, port: string | undefined) => {
  validate(port);

  return app.listen(port, () => console.log(chalk.blueBright(`[RUNNING] App is listening on port ${port} !`)));
};

const validate = (port: string | undefined) => {
  const errorMessage = `[WARN] Port is invalid value ${port}`;

  if (isUndefined(port)) {
    throw new Error(errorMessage);
  } else if (isPositiveNumber(parseInt(port))) {
    return;
  }
  throw new Error(errorMessage);
};

export default initializePort;
