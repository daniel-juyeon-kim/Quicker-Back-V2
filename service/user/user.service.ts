import { KeyCreator } from "../../core/key-creator";
import { UserRepository } from "../../database/type-orm/repository/impl/user/user.repository";
import { UserControllerRequestData } from "../../validator/schema/routes/user/user-controller-request-data";

export interface UserService {
  createUser(body: UserControllerRequestData["createUser"], keyCreator: KeyCreator): Promise<void>;
  findUserNameByWalletAddress(walletAddress: string): ReturnType<UserRepository["findNameByWalletAddress"]>;
  findUserImageId(walletAddress: string): ReturnType<UserRepository["findUserProfileImageIdByWalletAddress"]>;
  updateUserImageId(arg0: { walletAddress: string; imageId: string }): Promise<void>;
}
