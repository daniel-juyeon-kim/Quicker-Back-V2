import { Types, message } from "../../validator";
import { intArrayValidator } from "../../validator/util/custom-validator";
import { TestName } from "./router/types/test-name";

describe("커스텀 validator 테스트", () => {
  test(TestName.PASS, () => {
    const testValue = "1,2,3,4,5";

    expect(intArrayValidator(testValue)).toEqual(true);
    expect(() => intArrayValidator(testValue)).not.toThrow();
  });

  test(TestName.FAIL, () => {
    expect(() => intArrayValidator("1,a,3,4")).toThrow(message.mustBe(Types.INT_ARRAY));
  });
});
