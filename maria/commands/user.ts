import { Birth_date, Image, Join_date, User } from "../models/init-models";

export class UserModel {
  async register(user: User, userBirthDate: Birth_date, hashed: string) {
    await User.create(user);
    Birth_date.create(userBirthDate);
    Join_date.create({
      id: hashed,
      timeStamp: Math.floor(Date.now() / 100),
    });
    Image.create({ id: user.id, imageId: "404" });
  }

  async findId(alletAddress: string) {
    return User.findOne({
      attributes: ["id"],
      where: { wallet_address: alletAddress },
      raw: true,
      nest: true,
    });
  }

  findName(walletAddress: string) {
    return User.findOne({
      attributes: ["name"],
      where: { wallet_address: walletAddress },
      raw: true,
    });
  }

  findImageId(userId: string) {
    return Image.findOne({
      attributes: ["imageId"],
      where: {
        id: userId,
      },
      nest: true,
      raw: true,
    });
  }

  updateImageId(userId: string, imageId: string) {
    return Image.update({ id: userId, imageId: imageId }, { where: { id: userId } });
  }
}
