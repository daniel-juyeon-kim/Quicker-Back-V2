import mongoose, { Connection, Schema } from "mongoose";

import { validateEnv } from "../../util/env";
import { EnvConfig } from "../../util/env/types";

export class MongooseConnector {
  private readonly connection: Connection;

  constructor(mongoDB: EnvConfig["mongoDB"]) {
    validateEnv(mongoDB);

    this.connection = mongoose.createConnection(mongoDB.url, { dbName: mongoDB.dbName });
  }

  createModel<T extends Schema>(name: string, schema?: T) {
    return this.connection.model(name, schema);
  }
}
