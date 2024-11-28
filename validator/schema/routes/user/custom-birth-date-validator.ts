import { FORMAT, mustBe } from "../../../error-message";

export const customBirthDateValidator = (value: string) => {
  const userBirthDate = splitDateStringToNumber(value);

  validateInvalidDate(userBirthDate);
  validateRegisterable(userBirthDate[0]);

  return true;
};

const splitDateStringToNumber = (value: string) => {
  const DATE_SPLITTER = "/";

  return value
    .split(DATE_SPLITTER)
    .map((element) => parseInt(element))
    .filter((element) => !isNaN(element));
};

const validateInvalidDate = (userBirthDate: number[]) => {
  const VALID_DATE_ARRAY_LENGTH = 3;

  if (userBirthDate.length === VALID_DATE_ARRAY_LENGTH) {
    return;
  }
  throw new Error(mustBe(FORMAT.DATE));
};

const validateRegisterable = (userBirthYear: number) => {
  const ERROR_MESSAGE_OUT_OF_REGISTRABLE_AGE_RANGE = "10세 이상 100세 이하만 가입 가능합니다.";

  const MAX_AGE = 100;
  const MIN_AGE = 10;

  const currentYear = new Date().getFullYear();

  const registerableMinimumYear = currentYear - MAX_AGE;
  const registerableMaximumYear = currentYear - MIN_AGE;

  if (registerableMinimumYear <= userBirthYear && userBirthYear <= registerableMaximumYear) {
    return;
  }
  throw new Error(ERROR_MESSAGE_OUT_OF_REGISTRABLE_AGE_RANGE);
};
