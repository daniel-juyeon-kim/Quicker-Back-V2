import { Sequelize } from "sequelize";
import { config } from "../../config";
import { validateEnv } from "../../util/env";

validateEnv(config.mariaDB);

export default new Sequelize("Quicker", config.mariaDB.user, config.mariaDB.password, {
  dialect: "mariadb",
  host: config.mariaDB.host,
  port: parseInt(config.mariaDB.port),
  logging: false,
});
