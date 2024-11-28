import mongoose from "mongoose";

import { config } from "../config";
import { validateEnv } from "../util/env";

validateEnv(config.mongoDB);

mongoose
  .connect(config.mongoDB.url, { dbName: config.mongoDB.dbName })
  .then(() => console.log("mongoose 연결 성공"))
  .catch((error) => {
    console.error("mongoose 연결 실패");
    throw error;
  });
