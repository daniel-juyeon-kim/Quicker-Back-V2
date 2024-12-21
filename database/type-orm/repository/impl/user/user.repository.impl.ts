import { Repository } from "typeorm";

import { UnknownDataBaseError } from "../../../../../core";
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

  async create({
    user,
    birthDate,
    id,
  }: {
    user: Pick<User, "name" | "walletAddress" | "email" | "contact">;
    birthDate: Date;
    id: string;
  }) {
    try {
      await this.repository.manager.transaction(async (manager) => {
        const userExists = await manager.existsBy(User, { id });

        if (userExists) {
          throw new DuplicatedDataError(`${id}에 해당하는 데이터가 이미 존재합니다.`);
        }

        await manager.insert(User, {
          id,
          ...user,
        });

        await manager.insert(BirthDate, {
          id,
          date: birthDate,
        });

        await manager.insert(ProfileImage, {
          id,
        });

        await manager.insert(JoinDate, {
          id,
        });
      });
    } catch (error) {
      if (error instanceof DuplicatedDataError) {
        throw error;
      }
      throw new UnknownDataBaseError(error);
    }
  }

  async findNameByWalletAddress(walletAddress: string) {
    try {
      const name = await this.repository.findOne({
        where: { walletAddress },
        select: { name: true },
      });

      this.validateNotNull(walletAddress, name);

      return name;
    } catch (error) {
      if (error instanceof NotExistDataError) {
        throw new NotExistDataError(`지갑주소 ${walletAddress}에 대응되는 데이터가 존재하지 않습니다.`);
      }
      throw new UnknownDataBaseError(error);
    }
  }

  async findUserProfileImageIdByWalletAddress(walletAddress: string) {
    try {
      const user = await this.repository.findOne({
        relations: { profileImage: true },
        where: { walletAddress },
        select: { profileImage: { imageId: true } },
      });

      this.validateNotNull(walletAddress, user);

      return user.profileImage;
    } catch (error) {
      if (error instanceof NotExistDataError) {
        throw new NotExistDataError(`지갑주소 ${walletAddress}에 대응되는 데이터가 존재하지 않습니다.`);
      }
      throw new UnknownDataBaseError(error);
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

        this.validateNotNull(walletAddress, user);

        await manager.update(ProfileImage, { id: user.id }, { imageId });
      });
    } catch (error) {
      if (error instanceof NotExistDataError) {
        throw new NotExistDataError(`${walletAddress}에 대응되는 데이터가 존재하지 않습니다.`);
      }
      throw new UnknownDataBaseError(error);
    }
  }
}
