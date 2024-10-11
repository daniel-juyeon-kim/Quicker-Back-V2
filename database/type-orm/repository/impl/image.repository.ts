import { Repository } from "typeorm";
import { ProfileImage } from "../../entity";
import { AbstractRepository } from "../abstract-repository";

export class ProfileImageRepository extends AbstractRepository {
  constructor(private readonly repository: Repository<ProfileImage>) {
    super();
  }

  async findProfileImageIdByUserId(id: string) {
    const imageId = await this.repository.findOne({
      select: { imageId: true },
      where: { id },
    });

    this.validateNotNull(imageId);

    return imageId;
  }

  async updateProfileImageIdByUserId(id: string, imageId: string) {
    await this.repository.update({ id }, { imageId });
  }
}
