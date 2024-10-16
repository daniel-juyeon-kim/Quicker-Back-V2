import winston, { Logger } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

export class ErrorFileLogger {
  private readonly configure = {
    level: "error",
    format: winston.format.prettyPrint(),
    transports: [
      new DailyRotateFile({
        filename: "%DATE%.error.log",
        datePattern: "YYYY-MM-DD",
        dirname: "error-logs",
      }),
    ],
  };

  constructor(private logger: Logger) {
    this.logger.configure(this.configure);
  }

  log({ error, date }: { error: unknown; date: Date }) {
    const localDateTime = date.toLocaleString();

    this.logger.log(this.configure.level, localDateTime, error);
  }
}
