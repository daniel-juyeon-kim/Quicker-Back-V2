import "reflect-metadata";

import { join } from "path/posix";
import { DataSource } from "typeorm";
import { config } from "../config";

import { CustomNamingStrategy } from "../database/type-orm/util/custom-naming-strategy";
import { validateEnv } from "../util/env";

validateEnv(config.mariaDB);

export const AppDataSource = new DataSource({
  type: "mariadb",
  host: config.mariaDB.host,
  port: parseInt(config.mariaDB.port as string),
  username: config.mariaDB.user,
  password: config.mariaDB.password,
  database: config.mariaDB.database,
  entities: [join(__dirname, "/../entity/*.ts")],
  namingStrategy: new CustomNamingStrategy(),
});
