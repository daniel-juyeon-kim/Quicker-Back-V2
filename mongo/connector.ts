import mongoose from "mongoose";
import { config } from "../config";
import { validateEnv } from "../util/env";
import { EnvConfig } from "../util/env/types";

const setUpMongoConnection = (mongoDB: EnvConfig["mongoDB"]) => {
  validateEnv(mongoDB);

  return async (dbName: string) => {
    return mongoose.createConnection(mongoDB.url, { dbName: mongoDB.dbName });
  };
};

const connectMongo = setUpMongoConnection(config.mongoDB);

export default connectMongo;
