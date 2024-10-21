import { isEmptyArray } from "../../../../util";

export const TRANSPORTATION_ALLOW_VALUES = ["bicycle", "bike", "car", "scooter", "truck", "walking"] as const;
const ERROR_MESSAGE_EMPTY_ARRAY = "비어있는 배열입니다.";
const ERROR_MESSAGE_INVAlLID_VALUE = "유효한 값이 아닙니다.";

export const validateTransportationRequestData = (value: string[]) => {
  // 배열이 비었거나 사이즈가 다르면 에러 던짐
  if (isEmptyArray(value)) {
    throw new Error(ERROR_MESSAGE_EMPTY_ARRAY);
  }

  // 배열 요소가 허용된 값에 포함되지 않으면 에러 던짐
  value.forEach((v) => {
    if (TRANSPORTATION_ALLOW_VALUES.includes(v as (typeof TRANSPORTATION_ALLOW_VALUES)[number])) {
      return;
    }
    throw new Error(ERROR_MESSAGE_INVAlLID_VALUE);
  });

  return true;
};
