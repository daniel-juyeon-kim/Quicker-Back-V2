import { KeyCreator } from "../../core/key-creator";
import { UserRepository } from "../../database/type-orm/repository/impl/user/user.repository";
import { UserControllerRequestData as RequestData } from "../../validator/schema/routes/user";
import { UserService } from "./user-service";

export class UserServiceImpl implements UserService {
  constructor(private readonly repository: UserRepository) {}

  async postUser(
    { walletAddress, name, email, contact, birthDate }: RequestData["postUser"],
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

    await this.repository.createUser({ user, birthDate: userBirthDateObject, id });
  }

  async findUserNameByWalletAddress(walletAddress: string) {
    const name = await this.repository.findNameByWalletAddress(walletAddress);
    return name;
  }

  async getUserImageId(walletAddress: string) {
    const image = await this.repository.findUserProfileImageIdByWalletAddress(walletAddress);
    return image;
  }

  async putUserImageId({ imageId, walletAddress }: RequestData["putUserImageId"]) {
    await this.repository.updateUserProfileImageIdByWalletAddress({ imageId, walletAddress });
  }
}
