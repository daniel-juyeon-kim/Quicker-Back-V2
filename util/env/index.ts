import { ExcludeEmptyString, isEmptyString, isString, isUndefined } from "..";
import { EnvObject } from "./types";

export type Env = string | undefined;
export const DEVELOPMENT = "development";

export const isDevelopment = (env: Env): env is typeof DEVELOPMENT => {
  return env === DEVELOPMENT;
};

export const isValidEnv = (value: Env): value is ExcludeEmptyString => {
  return !isUndefined(value) && !isEmptyString(value);
};

export const isEnvType = (value: unknown): value is Env => {
  return isUndefined(value) || isString(value);
};

export const validateEnv: ValidateEnvFunction = (envObject) => {
  for (const key in envObject) {
    const value = envObject[key];

    validateEnvValue(key, value);
  }
};

type ValidateEnvFunction = {
  <T extends EnvObject>(envObject: T): asserts envObject is ExcludeUndefined<T>;
};

type ExcludeUndefined<T extends EnvObject> = {
  readonly [K in keyof T]: Exclude<T[K], undefined>;
};

export const validateEnvValue: (key: string, env: Env) => asserts env is ExcludeEmptyString = (key, env) => {
  if (isValidEnv(env)) {
    return;
  }

  const errorMessage = isUndefined(env)
    ? `[WARN] Invalid Env value, ${key} is ${env}`
    : `[WARN] Invalid Env value, ${key} is empty string`;

  throw new Error(errorMessage);
};
