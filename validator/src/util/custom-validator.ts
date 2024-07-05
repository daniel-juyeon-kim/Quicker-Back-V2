import { message, Types } from "../..";

export class CustomValidator {
  private static SPLITTER = ",";
  public static validateIntList(arg: string): true {
    arg.split(CustomValidator.SPLITTER).forEach(CustomValidator.checkStringTypeNumber);

    return true;
  }

  private static checkStringTypeNumber(expectNumber: string) {
    const number = parseInt(expectNumber);

    if (isNaN(number)) {
      throw new Error(message.mustBe(Types.INT_ARRAY));
    }
  }
}
