import { slackBot } from "../service";
import { CronService } from "./cron-service";
import { dataService } from "./data";
import { tableService } from "./table";

export const cronService = new CronService({ dataService, tableService, errorMessageBot: slackBot });
