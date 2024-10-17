import { DATA, mustBe, TYPE } from "../../../error-message";

// GET /room
export const getRoomSchema = {
  orderNum: {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isInt: {
      errorMessage: mustBe(TYPE.INTEGER),
    },
  },
};

// GET /room/message
export const getRoomMessageSchema = {
  orderNum: {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isInt: {
      errorMessage: mustBe(TYPE.INTEGER),
    },
  },
};
