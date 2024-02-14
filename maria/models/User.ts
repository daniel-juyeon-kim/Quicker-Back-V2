import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Birth_date, Birth_dateCreationAttributes, Birth_dateId } from './Birth_date';
import type { Image, ImageCreationAttributes, ImageId } from './Image';
import type { Join_date, Join_dateCreationAttributes, Join_dateId } from './Join_date';

export interface UserAttributes {
  id: string;
  wallet_address: string;
  name: string;
  email: string;
  contact: string;
  manager: number;
}

export type UserPk = "id";
export type UserId = User[UserPk];
export type UserCreationAttributes = UserAttributes;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  id!: string;
  wallet_address!: string;
  name!: string;
  email!: string;
  contact!: string;
  manager!: number;

  // User hasOne Birth_date via id
  Birth_date!: Birth_date;
  getBirth_date!: Sequelize.HasOneGetAssociationMixin<Birth_date>;
  setBirth_date!: Sequelize.HasOneSetAssociationMixin<Birth_date, Birth_dateId>;
  createBirth_date!: Sequelize.HasOneCreateAssociationMixin<Birth_date>;
  // User hasOne Image via id
  Image!: Image;
  getImage!: Sequelize.HasOneGetAssociationMixin<Image>;
  setImage!: Sequelize.HasOneSetAssociationMixin<Image, ImageId>;
  createImage!: Sequelize.HasOneCreateAssociationMixin<Image>;
  // User hasOne Join_date via id
  Join_date!: Join_date;
  getJoin_date!: Sequelize.HasOneGetAssociationMixin<Join_date>;
  setJoin_date!: Sequelize.HasOneSetAssociationMixin<Join_date, Join_dateId>;
  createJoin_date!: Sequelize.HasOneCreateAssociationMixin<Join_date>;

  static initModel(sequelize: Sequelize.Sequelize): typeof User {
    return User.init({
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    wallet_address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    contact: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    manager: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'User',
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
