import { Repository } from "typeorm";
import { BirthDate } from "../../../entity/birth-date.entity";
import { ProfileImage } from "../../../entity/image.entity";
import { JoinDate } from "../../../entity/join-date.entity";
import { User } from "../../../entity/user.entity";
import { NotExistDataError } from "../../../util";
import { DuplicatedDataError } from "../../../util/error/duplicated-data.error";
import { AbstractRepository } from "../../abstract-repository";
import { UserRepository } from "./user.repository";

export class UserRepositoryImpl extends AbstractRepository implements UserRepository {
  constructor(private readonly repository: Repository<User>) {
    super();
  }

  async createUser({
    user,
    birthDate,
    id,
  }: {
    user: Pick<User, "name" | "walletAddress" | "email" | "contact">;
    birthDate: Date;
    id: string;
  }) {
    await this.repository.manager.transaction(async (manager) => {
      const condition = await manager.existsBy(User, { id });

      if (condition) {
        throw new DuplicatedDataError(`${id}에 해당하는 데이터가 이미 존재합니다.`);
      }

      const userEntity = manager.create(User, {
        ...user,
        id,
      });
      await manager.insert(User, userEntity);

      const birthDateEntity = manager.create(BirthDate, {
        id,
        date: birthDate,
        user: userEntity,
      });
      await manager.insert(BirthDate, birthDateEntity);

      const profileImage = manager.create(ProfileImage, {
        id,
        user: userEntity,
      });
      await manager.insert(ProfileImage, profileImage);

      const joinDate = manager.create(JoinDate, {
        id,
        date: birthDate,
        user: userEntity,
      });
      await manager.insert(JoinDate, joinDate);
    });
  }

  async findNameByWalletAddress(walletAddress: string) {
    try {
      const name = await this.repository.findOne({
        where: { walletAddress },
        select: { name: true },
      });

      this.validateNotNull(name);

      return name;
    } catch (error) {
      if (error instanceof NotExistDataError) {
        throw new NotExistDataError(`지갑주소 ${walletAddress}에 대응되는 ${this.ERROR_MESSAGE_NOT_EXIST_DATA}`);
      }
      throw error;
    }
  }

  async findUserProfileImageIdByWalletAddress(walletAddress: string) {
    try {
      const user = await this.repository.findOne({
        relations: { profileImage: true },
        where: { walletAddress },
        select: { profileImage: { imageId: true } },
      });

      this.validateNotNull(user);

      return user.profileImage;
    } catch (error) {
      if (error instanceof NotExistDataError) {
        throw new NotExistDataError(`지갑주소 ${walletAddress}에 대응되는 ${this.ERROR_MESSAGE_NOT_EXIST_DATA}`);
      }
      throw error;
    }
  }

  async updateUserProfileImageIdByWalletAddress({
    walletAddress,
    imageId,
  }: {
    walletAddress: string;
    imageId: string;
  }) {
    try {
      await this.repository.manager.transaction(async (manager) => {
        const user = await manager.findOneBy(User, { walletAddress });

        this.validateNotNull(user);

        await manager.update(ProfileImage, { id: user.id }, { imageId });
      });
    } catch (error) {
      if (error instanceof NotExistDataError) {
        throw new NotExistDataError(`${walletAddress}에 대응되는 ${this.ERROR_MESSAGE_NOT_EXIST_DATA}`);
      }
      throw error;
    }
  }
}
