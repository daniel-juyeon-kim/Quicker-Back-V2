import { customBirthDateValidator } from "../../../../validator/schema/routes/user/custom-birth-date-validator";

describe("customBirthDateValidator", () => {
  test("통과하는 테스트", () => {
    expect(() => customBirthDateValidator("2000/01/01")).not.toThrow();
  });

  describe("실패하는 테스트", () => {
    test("올바르지 않은 포멧", () => {
      expect(() => customBirthDateValidator("200001/01")).toThrow("날자 형식 이어야 합니다.");
    });

    test("올바르지 않은 포멧", () => {
      expect(() => customBirthDateValidator("20000101")).toThrow("날자 형식 이어야 합니다.");
    });

    test("경계값 테스트, 100세", () => {
      expect(() => customBirthDateValidator("1923/01/01")).toThrow("10세 이상 100세 이하만 가입 가능합니다.");
    });

    test("경계값 테스트, 99세", () => {
      expect(() => customBirthDateValidator("1924/01/01")).not.toThrow();
    });

    test("경계값 테스트, 10세", () => {
      expect(() => customBirthDateValidator("2014/01/01")).not.toThrow();
    });

    test("경계값 테스트, 9세", () => {
      expect(() => customBirthDateValidator("2015/01/01")).toThrow("10세 이상 100세 이하만 가입 가능합니다.");
    });
  });
});
