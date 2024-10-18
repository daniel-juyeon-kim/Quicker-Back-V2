import { KeyCreator } from "../../core/key-creator";
import { UserRepository } from "../../database/type-orm/repository/impl/user/user.repository";
import { UserControllerRequestData } from "../../validator/schema/routes/user";

export interface UserService {
  postUser(body: UserControllerRequestData["postUser"], keyCreator: KeyCreator): Promise<void>;
  findUserNameByWalletAddress(walletAddress: string): ReturnType<UserRepository["findNameByWalletAddress"]>;
  getUserImageId(walletAddress: string): ReturnType<UserRepository["findUserProfileImageIdByWalletAddress"]>;
  putUserImageId(arg0: { walletAddress: string; imageId: string }): Promise<void>;
}
