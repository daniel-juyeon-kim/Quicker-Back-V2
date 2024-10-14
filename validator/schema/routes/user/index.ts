import { Schema } from "express-validator";
import { ExpectType, ValidateErrorMessage } from "../../../error-message";

export interface UserControllerRequestData {
  registerUser: {
    User: {
      wallet_address: string;
      name: string;
      email: string;
      contact: string;
    };
    Birthday: Date;
  };

  findUserNameByWalletAddress: { walletAddress: string };

  putUserImageId: { walletAddress: string; imageId: string };

  getUserImageId: { walletAddress: string };
}

// GET /user/name
export const getUserNameSchema = {
  walletAddress: {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isString: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.STRING),
    },
  },
};

// GET /user/image/id
export const getUserImageIdSchema: Schema = {
  walletAddress: {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isString: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.STRING),
    },
  },
};

// PUT /user/image/id
export const putUserImageIdSchema: Schema = {
  walletAddress: {
    escape: true,
    trim: true,
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isString: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.STRING),
    },
  },
  imageId: {
    escape: true,
    trim: true,
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isNumeric: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.INT),
    },
    isString: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.STRING),
    },
  },
};
