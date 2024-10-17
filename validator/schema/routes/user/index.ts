import { Schema } from "express-validator";
import { DATA, mustBe, TYPE } from "../../../error-message";

export interface UserControllerRequestData {
  registerUser: {
    User: {
      wallet_address: string;
      name: string;
      email: string;
      contact: string;
    };
    Birthday: {
      year: number;
      month: number;
      date: number;
    };
  };

  findUserNameByWalletAddress: { walletAddress: string };

  putUserImageId: { walletAddress: string; imageId: string };

  getUserImageId: { walletAddress: string };
}

// GET /user/name
export const getUserNameSchema = {
  walletAddress: {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isString: {
      errorMessage: mustBe(TYPE.STRING),
    },
  },
};

// GET /user/image/id
export const getUserImageIdSchema: Schema = {
  walletAddress: {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isString: {
      errorMessage: mustBe(TYPE.STRING),
    },
  },
};

// PUT /user/image/id
export const putUserImageIdSchema: Schema = {
  walletAddress: {
    escape: true,
    trim: true,
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isString: {
      errorMessage: mustBe(TYPE.STRING),
    },
  },
  imageId: {
    escape: true,
    trim: true,
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isNumeric: {
      errorMessage: mustBe(TYPE.INTEGER),
    },
    isString: {
      errorMessage: mustBe(TYPE.STRING),
    },
  },
};
