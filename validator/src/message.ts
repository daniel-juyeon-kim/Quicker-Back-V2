import { Types } from "./types";

export const message = {
  exist: "가 존재하면 안됩니다.",
  notExist: "가 존재하지 않거나 값이 비어있습니다.",
  // empty: "에 값이 비어있습니다.",
  mustBe: (type: Types) => {
    return "은 " + type + "타입 이여야 합니다.";
  },
};
