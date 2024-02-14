import mongoose from "mongoose";
import config from "../config";

const connectMongo = async (databaseName : string) => {
  if (config.db.mongo === undefined) {
    throw new Error("dotenv의 MONGO_CHAT의 값이 없음");
  } else {
    return mongoose.createConnection(config.db.mongo , {dbName: databaseName});
  }
};

export default connectMongo