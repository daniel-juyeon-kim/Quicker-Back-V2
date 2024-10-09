import mongoose, { Connection, Schema } from "mongoose";

import { validateEnvValue } from "../../util/env";
import { EnvConfig } from "../../util/env/types";

export class MongooseConnector {
  private readonly connection: Connection;

  constructor(mongoDB: EnvConfig["mongoDB"], dbName: string) {
    validateEnvValue("mongoDB", mongoDB);

    this.connection = mongoose.createConnection(mongoDB, { dbName });
  }

  createModel<T extends Schema>(name: string, schema?: T) {
    return this.connection.model(name, schema);
  }
}
