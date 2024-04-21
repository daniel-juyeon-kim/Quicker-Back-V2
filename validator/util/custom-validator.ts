import { message } from "../";
import { Types } from "../";
import { checkNotNumber } from "../../service/checker";

export const intArrayValidator = (arg: string) => {
  arg.split(",").forEach((splitArg) => {
    try {
      checkNotNumber(splitArg)
    } catch (e) {
      throw new Error(message.mustBe(Types.INT_ARRAY))
    }
  });
  return true;
};
