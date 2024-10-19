import { KeyCreator } from "../../core/key-creator";
import { UserRepository } from "../../database/type-orm/repository/impl/user/user.repository";
import { UserControllerRequestData as RequestData } from "../../validator/schema/routes/user/user-controller-request-data";
import { UserService } from "./user.service";

export class UserServiceImpl implements UserService {
  constructor(private readonly repository: UserRepository) {}

  async createUser(
    { walletAddress, name, email, contact, birthDate }: RequestData["createUser"],
    dbUserPkCreator: KeyCreator,
  ) {
    const user = {
      walletAddress,
      name,
      email,
      contact,
    };

    const userBirthDateObject = new Date(birthDate);

    const id = dbUserPkCreator.createDbUserId(user.contact);

    await this.repository.create({ user, birthDate: userBirthDateObject, id });
  }

  async findUserNameByWalletAddress(walletAddress: string) {
    return await this.repository.findNameByWalletAddress(walletAddress);
  }

  async findUserImageId(walletAddress: string) {
    return await this.repository.findUserProfileImageIdByWalletAddress(walletAddress);
  }

  async updateUserImageId({ imageId, walletAddress }: RequestData["updateUserImageId"]) {
    await this.repository.updateUserProfileImageIdByWalletAddress({ imageId, walletAddress });
  }
}
