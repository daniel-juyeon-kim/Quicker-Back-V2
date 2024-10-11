import { Repository } from "typeorm";
import { BasicBirthDate } from "../../entity/birth-date.entity";
import { ProfileImage } from "../../entity/image.entity";
import { JoinDate } from "../../entity/join-date.entity";
import { User } from "../../entity/user.entity";
import { AbstractRepository } from "../abstract-repository";

type BasicUser = Pick<User, "id" | "walletAddress" | "name" | "email" | "contact">;

export class UserRepository extends AbstractRepository {
  constructor(private readonly userRepository: Repository<User>) {
    super();
  }

  async findIdByWalletAddress(walletAddress: string) {
    const userId = await this.userRepository.findOne({
      where: { walletAddress },
      select: { id: true },
    });

    this.validateNotNull(userId);

    return userId;
  }

  async findNameByWalletAddress(walletAddress: string) {
    const name = await this.userRepository.findOne({
      where: { walletAddress },
      select: { name: true },
    });

    this.validateNotNull(name);

    return name;
  }

  async createUser({ user, birthDate, id }: { user: BasicUser; birthDate: BasicBirthDate; id: string }) {
    user.id = id;
    birthDate.id = id;

    const profileImage = new ProfileImage();
    profileImage.id = id;

    const joinDate = new JoinDate();
    joinDate.id = id;

    await this.userRepository.save({
      ...user,
      birthDate,
      joinDate,
      profileImage,
    });
  }
}
