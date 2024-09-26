import { join } from "node:path";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { CustomNamingStrategy } from "../../../../database/type-orm/connector/custom-naming-strategy";

export const createStudyDataSource = (dirName: string) => {
  return new DataSource({
    type: "sqlite",
    database: ":memory:",
    entities: [join(`${dirName}/**/*.entity.ts`)],
    synchronize: true,
    namingStrategy: new CustomNamingStrategy(),
    logging: true,
  });
};
