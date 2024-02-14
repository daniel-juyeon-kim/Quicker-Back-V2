import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Notification_info, Notification_infoId } from './Notification_info';

export interface Notification_timeAttributes {
  id: string;
  timeStamp: number;
}

export type Notification_timePk = "id";
export type Notification_timeId = Notification_time[Notification_timePk];
export type Notification_timeCreationAttributes = Notification_timeAttributes;

export class Notification_time extends Model<Notification_timeAttributes, Notification_timeCreationAttributes> implements Notification_timeAttributes {
  id!: string;
  timeStamp!: number;

  // Notification_time belongsTo Notification_info via id
  id_Notification_info!: Notification_info;
  getId_Notification_info!: Sequelize.BelongsToGetAssociationMixin<Notification_info>;
  setId_Notification_info!: Sequelize.BelongsToSetAssociationMixin<Notification_info, Notification_infoId>;
  createId_Notification_info!: Sequelize.BelongsToCreateAssociationMixin<Notification_info>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Notification_time {
    return Notification_time.init({
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Notification_info',
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
    tableName: 'Notification_time',
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
