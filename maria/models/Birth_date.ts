import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { User, UserId } from './User';

export interface Birth_dateAttributes {
  id: string;
  year: number;
  month: number;
  date: number;
}

export type Birth_datePk = "id";
export type Birth_dateId = Birth_date[Birth_datePk];
export type Birth_dateCreationAttributes = Birth_dateAttributes;

export class Birth_date extends Model<Birth_dateAttributes, Birth_dateCreationAttributes> implements Birth_dateAttributes {
  id!: string;
  year!: number;
  month!: number;
  date!: number;

  // Birth_date belongsTo User via id
  id_User!: User;
  getId_User!: Sequelize.BelongsToGetAssociationMixin<User>;
  setId_User!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createId_User!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Birth_date {
    return Birth_date.init({
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Birth_date',
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
