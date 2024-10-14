import { KeyCreator } from "../../core/key-creator";
import { UserRepository } from "../../database/type-orm/repository/impl/user/user.repository";

export interface UserService {
  registerUser(
    body: {
      User: {
        wallet_address: string;
        name: string;
        email: string;
        contact: string;
      };
      Birthday: Date;
    },
    keyCreator: KeyCreator,
  ): Promise<void>;
  findUserNameByWalletAddress(walletAddress: string): ReturnType<UserRepository["findNameByWalletAddress"]>;
  getUserImageId(walletAddress: string): ReturnType<UserRepository["findUserProfileImageIdByWalletAddress"]>;
  putUserImageId(arg0: { walletAddress: string; imageId: string }): Promise<void>;
}
