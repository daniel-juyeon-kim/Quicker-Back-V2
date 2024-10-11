import { Repository } from "typeorm";
import { BasicBirthDate } from "../../entity/birth-date.entity";
import { ProfileImage } from "../../entity/image.entity";
import { JoinDate } from "../../entity/join-date.entity";
import { User } from "../../entity/user.entity";
import { AbstractRepository } from "../abstract-repository";

type BasicUserEntityPropertyKeys = "id" | "walletAddress" | "name" | "email" | "contact";
type BasicUser = Pick<User, BasicUserEntityPropertyKeys>;

export class UserRepository extends AbstractRepository {
  constructor(private readonly repository: Repository<User>) {
    super();
  }

  async findIdByWalletAddress(walletAddress: string) {
    const userId = await this.repository.findOne({
      where: { walletAddress },
      select: { id: true },
    });

    this.validateNotNull(userId);

    return userId;
  }

  async findNameByWalletAddress(walletAddress: string) {
    const name = await this.repository.findOne({
      where: { walletAddress },
      select: { name: true },
    });

    this.validateNotNull(name);

    return name;
  }

  async createUser({ user, birthDate, id }: { user: BasicUser; birthDate: BasicBirthDate; id: string }) {
    user.id = id;
    birthDate.id = id;

    const profileImage = this.repository.manager.create(ProfileImage, { id: id });
    const joinDate = this.repository.manager.create(JoinDate, { id: id });

    await this.repository.manager.save(User, {
      ...user,
      birthDate,
      joinDate,
      profileImage,
    });
  }
}
