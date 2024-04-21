import { message } from "../";
import { Types } from "../";

export const intArrayValidator = (arg: string) => {
  arg.split(",").forEach((value) => {
    if (Number.isNaN(parseInt(value))) {
      throw new Error(message.mustBe(Types.INT_ARRAY))
    }
  });
  return true;
};
