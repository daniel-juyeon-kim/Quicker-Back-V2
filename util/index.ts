const DEVELOPMENT = "development";
const ZERO = 0;

export const isUndefined = (value: any): value is undefined => {
  return value === undefined;
};

export const isDevelopment = (env: string | undefined): env is typeof DEVELOPMENT => {
  return env === DEVELOPMENT;
};

export const isPositiveNumber = (number: number) => {
  return Number.isFinite(number) && ZERO < number;
};
