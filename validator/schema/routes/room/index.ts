import { ExpectType, ValidateErrorMessage } from "../../../error-message";

// GET /room
export const getRoomSchema = {
  orderNum: {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isInt: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.INT),
    },
  },
};

// GET /room/message
export const getRoomMessageSchema = {
  orderNum: {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isInt: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.INT),
    },
  },
};
