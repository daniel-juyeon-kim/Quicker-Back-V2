import { ExpectType, ValidateErrorMessage } from ".";
import { isNumber } from "../util";

const SPLITTER = ",";

export const validateStringTypeNumberList = (string: string): true => {
  string.split(SPLITTER).forEach(validateNumber);

  return true;
};

const validateNumber = (expectNumber: string) => {
  const number = parseInt(expectNumber);

  if (isNumber(number)) {
    return;
  }
  throw new Error(ValidateErrorMessage.mustBe(ExpectType.INT_ARRAY));
};
