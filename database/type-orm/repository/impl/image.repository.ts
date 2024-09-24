import { Image } from "../../entity/image.entity";
import { AbstractRepository } from "../abstract-repository";

export class ImageRepository extends AbstractRepository<Image> {
  protected readonly repository = this.dataSource.getRepository(Image);
  protected readonly entity = Image;

  async findImageIdByUserId(id: string) {
    const imageId = await this.repository.findOne({
      select: { imageId: true },
      where: { id },
    });

    this.validateNull(imageId);

    return imageId;
  }

  async updateImageIdByUserId(id: string, imageId: string) {
    await this.repository.update({ id }, { imageId });
  }
}
