import { config } from "../../../config";

export type EnvConfig = typeof config;

export type EnvObject = {
  readonly [K: string]: Env;
};

export type InvalidEnv = "" | undefined;
export type Env = string | undefined;
