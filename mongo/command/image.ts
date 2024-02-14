import { Connection } from "mongoose";
import { ImageFile, ImageFileSchema } from "../schemas/image-file";

export class ImageModel {
  async find (connection : Connection, orderId: string) {
    const imageModel = connection.model(orderId, ImageFileSchema);
    const images = await imageModel.find();
    await connection.destroy();
    return images;
  };
  
  async create (connection : Connection, orderNum: string, bufferImage : any) {
    const imageModel = connection.model(orderNum, ImageFile);
    const image = new imageModel({image:bufferImage});
    await image.save();
    await connection.destroy();
  };
  
  async findFailImage (connection : Connection, orderId: string) {
    const uploadImage = connection.model(orderId, ImageFileSchema);
    const [ image ] = await uploadImage.find().sort("desc").limit(1);
    await connection.destroy();
    return image;
  };
  
  async createFailImage (connection : Connection, orderNum: string, bufferImage : any, reason : string) {
    const uploadImage = connection.model(orderNum, ImageFileSchema);
    const image = new uploadImage({
      image: bufferImage,
      reason: reason,
    });
    await image.save();
    await connection.destroy();
  };
}