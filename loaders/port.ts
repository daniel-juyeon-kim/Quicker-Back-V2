import chalk from "chalk";
import { Application } from "express";
import { isNumber } from "../util";
import { validateEnvValue } from "../util/env";
import { EnvConfig } from "../util/env/types";

const initializePort = (app: Application, port: EnvConfig["port"]) => {
  validatePort(port);

  return app.listen(port, () => console.log(chalk.blueBright(`[RUNNING] App is listening on port ${port} !`)));
};

type ValidatePortFunction = (port: EnvConfig["port"]) => asserts port is `${number}`;

const validatePort: ValidatePortFunction = (port) => {
  validateEnvValue("port", port);

  if (isNumber(parseInt(port))) {
    return;
  }

  throw new Error(`[WARN] Port must be a numeric string`);
};

export default initializePort;
