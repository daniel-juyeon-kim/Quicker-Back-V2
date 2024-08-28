import { Env } from "../env/types";
import { AbstractEnvChecker } from "./abstract-env-checker";

export class ProductionEnvChecker extends AbstractEnvChecker {
  protected checkValidEnv(key: string, value: Env) {
    super.checkValidEnv(key, value);
  }
}
