import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { User, UserId } from './User';

export interface ImageAttributes {
  id: string;
  imageId: string;
}

export type ImagePk = "id";
export type ImageId = Image[ImagePk];
export type ImageCreationAttributes = ImageAttributes;

export class Image extends Model<ImageAttributes, ImageCreationAttributes> implements ImageAttributes {
  id!: string;
  imageId!: string;

  // Image belongsTo User via id
  id_User!: User;
  getId_User!: Sequelize.BelongsToGetAssociationMixin<User>;
  setId_User!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createId_User!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Image {
    return Image.init({
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    imageId: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Image',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
