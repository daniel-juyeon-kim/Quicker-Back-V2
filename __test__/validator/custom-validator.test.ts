import { message, Types } from "../../validator";
import { validateIntList } from "../../validator/util/custom-validator";
import { TestName } from "./router/types/test-name";

describe("커스텀 validator 테스트", () => {
  test(TestName.PASS, () => {
    const testValue = "1,2,3,4,5";

    expect(validateIntList(testValue)).toEqual(true);
    expect(() => validateIntList(testValue)).not.toThrow();
  });

  test(TestName.FAIL, () => {
    expect(() => validateIntList("1,a,3,4")).toThrow(message.mustBe(Types.INT_ARRAY));
  });
});
