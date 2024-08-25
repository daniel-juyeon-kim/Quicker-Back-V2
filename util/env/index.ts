import { ExcludeEmptyString, isEmptyString, isString, isUndefined } from "..";

export type Env = string | undefined; // ENV 관련
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
