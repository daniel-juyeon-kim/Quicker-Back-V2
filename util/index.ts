const DEVELOPMENT = "development";
const ZERO = 0;

export type Env = string | undefined;

export const isDevelopment = (env: Env): env is typeof DEVELOPMENT => {
  return env === DEVELOPMENT;
};

export const isUndefined = (value: unknown): value is undefined => {
  return value === undefined;
};

export const isPositiveNumber = (value: number) => {
  return isNumber(value) && isPositive(value);
};

export const isNumber = (value: number): value is number => {
  return Number.isFinite(value);
};

const isPositive = (value: number) => {
  return ZERO < value;
};
