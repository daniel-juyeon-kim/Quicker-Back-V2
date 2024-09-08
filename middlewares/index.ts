import { CronJob } from "cron";
import { config } from "../config";
import { cronService } from "../cron";
import { isDevelopment } from "../util/env";
import { Folder } from "./folder";

export { caverLimiter } from "./limiter";

export const folder = new Folder();

const developCronFunction = () => console.log(`${new Date()}: cron called`);
const cronFunction = isDevelopment(config.nodeEnv) ? developCronFunction : cronService.run;

new CronJob("* * 3 1 *", cronFunction, null, true, "Asia/Seoul");
