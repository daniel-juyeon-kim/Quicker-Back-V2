const ERROR_NOT_NUMBER = "숫자가 아닙니다.";

const isNull = (value: any) => {
  return value === null
}

/**
 * 객체의 속성중 null이 있는지 확인하는 함수
 * @param obj 객체
 * @returns boolean
 */
export const isAttributeNull = <T extends Object>(obj: T) => {
  for(const key in obj) {
    if (isNull(obj[key])) {
      return true;
    }
  }
  return false;
}

/**
 * 숫자인 문자열을 검사하는 함수
 * @param expectNumber 숫자인 문자열
 * @throws "숫자가 아닙니다."
 */
export const checkNotNumber = (expectNumber: string) => {
  if (Number.isNaN(parseInt(expectNumber))) {
    throw new Error(ERROR_NOT_NUMBER);
  }
};