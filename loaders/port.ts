import chalk from "chalk";
import { Application } from "express";
import { validateEnvValue } from "../util/env";
import { EnvConfig } from "../util/env/types";

const initializePort = (app: Application, port: EnvConfig["port"]) => {
  validateEnvValue("port", port);

  return app.listen(port, () => console.log(chalk.blueBright(`[RUNNING] App is listening on port ${port} !`)));
};
export default initializePort;
