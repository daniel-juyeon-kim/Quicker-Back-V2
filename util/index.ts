const DEVELOPMENT = "development";

export const isUndefined = (value: any): value is undefined => {
  return value === undefined;
};

export const isDevelopment = (env: string | undefined): env is typeof DEVELOPMENT => {
  return env === DEVELOPMENT;
};
