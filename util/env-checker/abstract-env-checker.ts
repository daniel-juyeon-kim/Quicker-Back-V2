import { isUndefined } from "..";
import { isEnvType, isValidEnv } from "../env";
import { Env, EnvObject, InvalidEnv } from "../env/types";
import { EnvChecker } from "./env-checker";

type EnvConfig = {
  readonly [K: string]: EnvObject | Env;
};

export abstract class AbstractEnvChecker implements EnvChecker {
  public checkEnv(key: string, value: EnvConfig | EnvObject | Env) {
    if (isEnvType(value)) {
      this.checkValidEnv(key, value);
      return;
    }

    for (const key in value) {
      this.checkEnv(key, value[key]);
    }
  }

  protected checkValidEnv(key: string, value: Env) {
    if (isValidEnv(value)) {
      return;
    }

    this.throwInvalidEnvError(key, value);
  }

  private throwInvalidEnvError(key: string, value: InvalidEnv) {
    if (isUndefined(value)) {
      throw new Error(`[WARN] ${key} is ${value}`);
    }
    throw new Error(`[WARN] ${key} is empty string`);
  }
}
