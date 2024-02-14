import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Notice, NoticeId } from './Notice';

export interface Noticed_timeAttributes {
  id: string;
  timeStamp: number;
}

export type Noticed_timePk = "id";
export type Noticed_timeId = Noticed_time[Noticed_timePk];
export type Noticed_timeCreationAttributes = Noticed_timeAttributes;

export class Noticed_time extends Model<Noticed_timeAttributes, Noticed_timeCreationAttributes> implements Noticed_timeAttributes {
  id!: string;
  timeStamp!: number;

  // Noticed_time belongsTo Notice via id
  id_Notice!: Notice;
  getId_Notice!: Sequelize.BelongsToGetAssociationMixin<Notice>;
  setId_Notice!: Sequelize.BelongsToSetAssociationMixin<Notice, NoticeId>;
  createId_Notice!: Sequelize.BelongsToCreateAssociationMixin<Notice>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Noticed_time {
    return Noticed_time.init({
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Notice',
        key: 'id'
      }
    },
    timeStamp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "초단위"
    }
  }, {
    sequelize,
    tableName: 'Noticed_time',
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
