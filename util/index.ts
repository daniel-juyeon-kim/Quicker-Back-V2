const DEVELOPMENT = "development";
const ZERO = 0;

export type Env = string | undefined;

export const isDevelopment = (env: Env): env is typeof DEVELOPMENT => {
  return env === DEVELOPMENT;
};

export const isUndefined = (value: unknown): value is undefined => {
  return value === undefined;
};

export const isPositiveNumber = (number: number) => {
  return isNumber(number) && isOverZero(number);
};

export const isNumber = (number: number): number is number => {
  return Number.isFinite(number);
};

const isOverZero = (number: number) => {
  return ZERO < number;
};
