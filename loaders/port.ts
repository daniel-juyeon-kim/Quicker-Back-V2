import chalk from "chalk";
import { Application } from "express";

const initializePort = (app: Application, port: string | undefined) => {
  validate(port);

  return app.listen(port, () => console.log(chalk.blueBright(`[RUNNING] App is listening on port ${port} !`)));
};

const validate = (port: string | undefined) => {
  const errorMessage = `port is ${port}`;

  if (port === undefined) {
    throw new Error(errorMessage);
  } else if (isNaN(parseInt(port))) {
    throw new Error(errorMessage);
  }
};

export default initializePort;
