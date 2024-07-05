import { CustomValidator, ExpectType, ValidateErrorMessage } from "../../validator";
import { TestName } from "./router/types/test-name";

describe("커스텀 validator 테스트", () => {
  test(TestName.PASS, () => {
    const testValue = "1,2,3,4,5";

    expect(CustomValidator.validateIntList(testValue)).toEqual(true);
    expect(() => CustomValidator.validateIntList(testValue)).not.toThrow();
  });

  test(TestName.FAIL, () => {
    expect(() => CustomValidator.validateIntList("1,a,3,4")).toThrow(ValidateErrorMessage.mustBe(ExpectType.INT_ARRAY));
  });
});
