import dotenv from "dotenv"
dotenv.config({path : '../.env'})

import chalk from "chalk";
import { Application } from "express";
import config from "../config";
import { KeyChecker } from "../service/key-validator";

const keyChecker = new KeyChecker();

const nodeenv = keyChecker.checkObject({key : config.nodeenv})
const local = keyChecker.checkObject(config.server.local)
const remote = keyChecker.checkObject(config.server.aws)

const port = {
  init: (app: Application) => {
    const HTTP_PORT = (nodeenv.key === "development") ? local.http : remote.http;
    return app.listen(HTTP_PORT, () => console.log(chalk.blueBright(`[RUNNING] | App is listening on port ${HTTP_PORT} !`)));
  },
};
export default port