import { mustBe, TYPE } from "../../validator";
import { validateStringTypeNumberList } from "../../validator/custom-validator";
import { TestName } from "./router/types/test-name";

describe("커스텀 validator 테스트", () => {
  test(TestName.PASS, () => {
    const testValue = "1,2,3,4,5";

    expect(validateStringTypeNumberList(testValue)).toEqual(true);
    expect(() => validateStringTypeNumberList(testValue)).not.toThrow();
  });

  test(TestName.FAIL, () => {
    expect(() => validateStringTypeNumberList("1,a,3,4")).toThrow(mustBe(TYPE.INTEGER_ARRAY));
  });
});
