import chalk from "chalk";

type Object = {[t : string] : string | undefined}

export class KeyChecker {
  public checkObject(object: Object) {
    for (const key in object) {
      this.isObjectValueUndefined(key, object);
    }
    return object as {[key : string] : string}
  }

  private isObjectValueUndefined(key: string, object: any) {
    if (object[key] === undefined) {
      console.error(chalk.bold.yellow(`[WARNNING] | ${key} is undefined`));
    }
  }
}
