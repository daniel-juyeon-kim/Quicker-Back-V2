import { ExpectType, ValidateErrorMessage } from "../..";

export class CustomValidator {
  private static SPLITTER = ",";
  public static validateIntList(arg: string): true {
    arg.split(CustomValidator.SPLITTER).forEach(CustomValidator.checkStringTypeNumber);

    return true;
  }

  private static checkStringTypeNumber(expectNumber: string) {
    const number = parseInt(expectNumber);

    if (isNaN(number)) {
      throw new Error(ValidateErrorMessage.mustBe(ExpectType.INT_ARRAY));
    }
  }
}
