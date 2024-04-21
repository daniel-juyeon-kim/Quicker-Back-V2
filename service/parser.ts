import { checkNotNumber } from "./checker";

const ERROR_INCLUDE_NOT_NUMBER = "숫자가 아닌 요소가 포함되어 있습니다.";

/**
 * "1,2,3"과 같은 문자열을 [1,2,3]인 리스트로 변환하는 함수
 * @param arg "1,2,3"과 같은 형식의 문자열
 * @throws "숫자가 아닌 요소가 포함되어 있습니다."
 */
export const parseToNumberList = (arg: string) => {
  return arg.split(",").map((splitArg) => {
    try {
      checkNotNumber(splitArg);
      return parseInt(splitArg);
    } catch (error) {
      throw new Error(ERROR_INCLUDE_NOT_NUMBER);
    }
  });
};
