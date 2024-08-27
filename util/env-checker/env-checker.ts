import { Env, EnvObject } from "../env/types";

export interface EnvChecker {
  check(key: string, value: Env | EnvObject): void;
}
