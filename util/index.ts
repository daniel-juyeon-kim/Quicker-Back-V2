const ZERO = 0;
export type ExcludeEmptyString = Exclude<string, "">;

export const isUndefined = (value: unknown): value is undefined => {
  return value === undefined;
};

export const isNull = (value: unknown) => {
  return value === null;
};

export const isNumber = (value: number): value is number => {
  return Number.isFinite(value);
};

export const isPositiveNumber = (value: number) => {
  return isNumber(value) && isPositive(value);
};

const isPositive = (value: number) => {
  return ZERO < value;
};

export const isEqual = (preValue: number, postValue: number) => {
  return preValue === postValue;
};

export const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

export const isEmptyString = (value: string): value is "" => {
  return value === "";
};

export const isFulfilled: <T>(result: PromiseSettledResult<T>) => true | false = (result) => {
  return result.status === "fulfilled";
};
