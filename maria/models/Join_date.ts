import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { User, UserId } from './User';

export interface Join_dateAttributes {
  id: string;
  timeStamp: number;
}

export type Join_datePk = "id";
export type Join_dateId = Join_date[Join_datePk];
export type Join_dateCreationAttributes = Join_dateAttributes;

export class Join_date extends Model<Join_dateAttributes, Join_dateCreationAttributes> implements Join_dateAttributes {
  id!: string;
  timeStamp!: number;

  // Join_date belongsTo User via id
  id_User!: User;
  getId_User!: Sequelize.BelongsToGetAssociationMixin<User>;
  setId_User!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createId_User!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Join_date {
    return Join_date.init({
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    timeStamp: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      comment: "초단위"
    }
  }, {
    sequelize,
    tableName: 'Join_date',
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
