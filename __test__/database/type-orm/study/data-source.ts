import { join } from "node:path";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { CustomNamingStrategy } from "../../../../database/type-orm/connector/custom-naming-strategy";

export const studyDataSource = new DataSource({
  type: "sqlite",
  database: join(`${__dirname}/study.db`),
  entities: [join(`${__dirname}/../**/*.entity.ts`)],
  synchronize: true,
  namingStrategy: new CustomNamingStrategy(),
  logging: false,
});
