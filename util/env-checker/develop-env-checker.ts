import { Env } from "../env/types";
import { AbstractEnvChecker } from "./abstract-env-checker";

export class DevelopEnvChecker extends AbstractEnvChecker {
  protected checkValidEnv(key: string, value: Env) {
    try {
      super.checkValidEnv(key, value);
    } catch (e) {
      const error = e as Error;
      console.error(error.message);
    }
  }
}
