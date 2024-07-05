export enum ExpectType {
  INT = "정수",
  FLOAT = "실수",
  STRING = "문자열",
  OBJECT = "객체",
  INT_ARRAY = "정수 배열",
  PHONE_NUMBER = "전화번호 형식",
}

export class ValidateErrorMessage {
  public static readonly exist = "가 존재하면 안됩니다.";
  public static readonly notExist = "가 존재하지 않거나 값이 비어있습니다.";
  public static mustBe(type: ExpectType) {
    return "은 " + type + "타입 이여야 합니다.";
  }
}
