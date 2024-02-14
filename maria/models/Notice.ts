import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Noticed_time, Noticed_timeCreationAttributes, Noticed_timeId } from './Noticed_time';

export interface NoticeAttributes {
  id: string;
  manager_id: string;
  title: string;
  detail: string;
  hits: number;
}

export type NoticePk = "id";
export type NoticeId = Notice[NoticePk];
export type NoticeCreationAttributes = NoticeAttributes;

export class Notice extends Model<NoticeAttributes, NoticeCreationAttributes> implements NoticeAttributes {
  id!: string;
  manager_id!: string;
  title!: string;
  detail!: string;
  hits!: number;

  // Notice hasOne Noticed_time via id
  Noticed_time!: Noticed_time;
  getNoticed_time!: Sequelize.HasOneGetAssociationMixin<Noticed_time>;
  setNoticed_time!: Sequelize.HasOneSetAssociationMixin<Noticed_time, Noticed_timeId>;
  createNoticed_time!: Sequelize.HasOneCreateAssociationMixin<Noticed_time>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Notice {
    return Notice.init({
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    manager_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    detail: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    hits: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Notice',
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
