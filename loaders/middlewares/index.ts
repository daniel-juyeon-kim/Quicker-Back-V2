import { CronJob } from "cron";
import { Folder } from "./folder";
import { caverLimiter } from "./limiter"

const folder = new Folder()
const cronJob = new CronJob(
  "0 0 3 1 * *",
  () => {},
  null,
  true,
  "Asia/Seoul"
);

export {
    folder,
    cronJob,
    caverLimiter
}