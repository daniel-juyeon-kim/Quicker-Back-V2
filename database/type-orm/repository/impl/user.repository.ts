import { BirthDate } from "../../entity/birth-date.entity";
import { Image } from "../../entity/image.entity";
import { JoinDate } from "../../entity/join-date.entity";
import { User } from "../../entity/user.entity";
import { AbstractRepository } from "../abstract-repository";

type BasicUserEntityPropertyKeys = "id" | "wallet_address" | "name" | "email" | "contact";
type BasicUser = Pick<User, BasicUserEntityPropertyKeys>;

export class UserRepository extends AbstractRepository<User> {
  protected readonly entity = User;
  protected readonly repository = this.dataSource.getRepository(User);

  async findIdByWalletAddress(walletAddress: string) {
    const wallet_address = walletAddress;

    const user = await this.repository.findOne({
      where: { wallet_address },
      select: { id: true },
    });

    this.validateNull(user);

    return user.id;
  }

  async findNameByWalletAddress(walletAddress: string) {
    const wallet_address = walletAddress;
    const user = await this.repository.findOne({
      where: { wallet_address },
      select: { name: true },
    });

    this.validateNull(user);

    return user.name;
  }

  async createUser({ user, birthDate, hash }: { user: BasicUser; birthDate: BirthDate; hash: string }) {
    user.id = hash;
    birthDate.id = hash;

    const birthDateEntity = this.dataSource.manager.create(BirthDate, birthDate);
    const image = this.dataSource.manager.create(Image, { id: hash });
    const joinDate = this.dataSource.manager.create(JoinDate, { id: hash });
    const userEntity = this.repository.create({ ...user, joinDate, birthDate: birthDateEntity, image });

    await this.repository.save(userEntity);
  }
}
