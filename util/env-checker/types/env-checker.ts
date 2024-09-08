import { Env, EnvObject } from "../../env/types";

export interface EnvChecker {
  checkEnv(key: string, value: Env | EnvObject): void;
}
