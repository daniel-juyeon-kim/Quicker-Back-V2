import { Request, Response } from "express";
import chalk from "chalk";
import morgan from "morgan";
import * as fs from "node:fs";
import path from "node:path";

import { dateFormater } from "../../service";

interface ConnectionInfo {
  ip: string;
  date: string;
  status: number | string;
  method: string;
  httpVersion: string;
  url: string;
  userAgent: string | undefined;
}

class Colorize {
  public color (validtor : Validator, connectionInfo : ConnectionInfo) : ConnectionInfo {
    const copyConnectionInfo = Object.assign({}, connectionInfo)
    const status = validtor.checkStatusType(copyConnectionInfo.status)

    copyConnectionInfo.date = chalk.green(copyConnectionInfo.date);
    copyConnectionInfo.status = this.colorizeStatus(status)
    
    return copyConnectionInfo;
  }

  private colorizeStatus (status : number) {
    if (status < 400) {
      return chalk.cyan.bold(status.toString());
    } else {
      return chalk.red.bold(status.toString());
    }
  }
}
class Validator {
  public checkStatusType(status : number | string) {
    if (typeof status !== "number") {
      throw new Error("TypeError : status must be number")
    }
    else {
      return status
    }
  }
}
class View {
  public show(log : string) {
    process.stdout.write(log + "\n");
  }
}

class Parser {
  parseConnection(req: Request, res: Response) {
    return {
      ip: req.ip,
      date: dateFormater.toLogFormat(new Date()),
      status: res.statusCode,
      method: req.method,
      httpVersion: req.httpVersion,
      url: req.originalUrl,
      userAgent: req.headers["user-agent"],
    };
  }
}

class Formater {
  toString({ip, date, status, method, httpVersion, url, userAgent}: ConnectionInfo) {
    return `${date} | ${ip} | ${status} | HTTP/${httpVersion} [${method}] ${url} | ${userAgent}`;
  }
}

const view = new View()
const parser = new Parser()
const formater = new Formater()
const validtor = new Validator()
const colorize = new Colorize()

morgan.token("custom", function (req: Request, res: Response) {
  const connectionInfo = parser.parseConnection(req, res)
  const colorizedInfo = colorize.color(validtor, connectionInfo)
  view.show(formater.toString(colorizedInfo))
  return formater.toString(connectionInfo)
});

const writeStream = fs.createWriteStream(path.join(__dirname, `../../logs/${dateFormater.toYYYYMMDD(new Date())}.log`), { flags: "a" });

const option = { stream: { write: (log: string) => writeStream.write(log) } };

export const customMorgan = () => morgan(":custom", option);