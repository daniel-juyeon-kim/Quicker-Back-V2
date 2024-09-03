import { averageInstance, cacheOrderInstance, locationInstance } from "../maria/commands";
import { blockChain, slackBot, tmapApi } from "../service";
import { AverageCalculator } from "./average-calculator";
import { CronService } from "./cron-service";
import { DB } from "./data/db";
import { ExternalApi } from "./data/external-api";

const db = new DB(averageInstance, cacheOrderInstance, locationInstance);
const externalApi = new ExternalApi(db, blockChain, tmapApi);
const averageCalculator = new AverageCalculator();

export const cronService = new CronService(slackBot, externalApi, db, averageCalculator);
