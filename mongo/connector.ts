import mongoose from "mongoose";
import { config } from "../config";
import { validateEnvValue } from "../util/env";
import { EnvConfig } from "../util/env/types";

const setUpMongoConnection = (mongoDB: EnvConfig["mongoDB"]) => {
  validateEnvValue("mongoDB", mongoDB);

  return async (dbName: string) => {
    return mongoose.createConnection(mongoDB, { dbName });
  };
};

const connectMongo = setUpMongoConnection(config.mongoDB);

export default connectMongo;
