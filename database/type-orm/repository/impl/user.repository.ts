import { DataSource } from "typeorm";
import { BasicBirthDate } from "../../entity/birth-date.entity";
import { Image } from "../../entity/image.entity";
import { JoinDate } from "../../entity/join-date.entity";
import { User } from "../../entity/user.entity";
import { AbstractRepository } from "../abstract-repository";

type BasicUserEntityPropertyKeys = "id" | "walletAddress" | "name" | "email" | "contact";
type BasicUser = Pick<User, BasicUserEntityPropertyKeys>;

export class UserRepository extends AbstractRepository<User> {
  constructor(dataSource: DataSource) {
    super(dataSource, User);
  }

  async findIdByWalletAddress(walletAddress: string) {
    const id = await this.repository.findOne({
      where: { walletAddress },
      select: { id: true },
    });

    this.validateNull(id);

    return id;
  }

  async findNameByWalletAddress(walletAddress: string) {
    const name = await this.repository.findOne({
      where: { walletAddress },
      select: { name: true },
    });

    this.validateNull(name);

    return name;
  }

  async createUser({ user, birthDate, hash }: { user: BasicUser; birthDate: BasicBirthDate; hash: string }) {
    user.id = hash;
    birthDate.id = hash;

    const image = this.repository.manager.create(Image, { id: hash });
    const joinDate = this.repository.manager.create(JoinDate, { id: hash });

    await this.repository.manager.save(User, {
      ...user,
      joinDate,
      birthDate: {
        ...birthDate,
      },
      image,
    });
  }
}
