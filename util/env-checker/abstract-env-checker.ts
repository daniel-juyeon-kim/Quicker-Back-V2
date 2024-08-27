import { isEmptyString, isString } from "..";
import { isEnvType, isValidEnv } from "../env";
import { Env, EnvConfig, EnvObject } from "../env/types";
import { EnvChecker } from "./env-checker";

export abstract class AbstractEnvChecker implements EnvChecker {
  public check(key: string, value: Env | EnvObject | EnvConfig) {
    if (isEnvType(value)) {
      this.showInvalidEnv(key, value);
      return;
    }

    for (const key in value) {
      this.check(key, value[key]);
    }
  }

  protected abstract showInvalidEnv(key: string, value: Env): void;

  protected validateEnv(key: string, value: Env) {
    if (isValidEnv(value)) {
      return;
    }

    if (isString(value) && isEmptyString(value)) {
      const value = "empty string";
      this.throwInvalidKeyError(key, value);
    }

    this.throwInvalidKeyError(key, value);
  }

  private throwInvalidKeyError(key: string, value: Env) {
    const errorMessage = `[WARNNING] ${key} is ${value}`;
    throw new Error(errorMessage);
  }
}
