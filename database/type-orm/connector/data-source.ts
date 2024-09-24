import "reflect-metadata";

import { join } from "path/posix";
import { DataSource } from "typeorm";
import { config } from "../../../config";
import { validateEnv } from "../../../util/env";
import { CustomNamingStrategy } from "./custom-naming-strategy";

validateEnv(config.mariaDB);

export const AppDataSource = new DataSource({
  type: "mariadb",
  host: config.mariaDB.host,
  port: parseInt(config.mariaDB.port),
  username: config.mariaDB.user,
  password: config.mariaDB.password,
  database: config.mariaDB.database,
  entities: [join(__dirname, "/../entity/*.ts")],
  namingStrategy: new CustomNamingStrategy(),
});

export const initializeDataSource = async (dataSource: DataSource) => {
  try {
    await initializeDataSourceConnection(dataSource);
  } catch (error) {
    console.log(error);
  }
};

const initializeDataSourceConnection = async (dataSource: DataSource) => {
  if (dataSource.isInitialized) {
    return;
  }
  await dataSource.initialize();
};
