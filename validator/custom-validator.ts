import { mustBe, TYPE } from ".";
import { isNumber } from "../util";

const SPLITTER = ",";

export const validateStringTypeNumberList = (value: string): true => {
  value.split(SPLITTER).forEach(validateNumber);

  return true;
};

const validateNumber = (expectNumber: string) => {
  const number = parseInt(expectNumber);

  if (isNumber(number)) {
    return;
  }
  throw new Error(mustBe(TYPE.INTEGER_ARRAY));
};
