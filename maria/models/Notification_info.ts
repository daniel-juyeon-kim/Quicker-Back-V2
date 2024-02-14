import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Notification_group, Notification_groupCreationAttributes, Notification_groupId } from './Notification_group';
import type { Notification_time, Notification_timeCreationAttributes, Notification_timeId } from './Notification_time';
import type { Sending_type, Sending_typeCreationAttributes, Sending_typeId } from './Sending_type';

export interface Notification_infoAttributes {
  id: string;
  message: string;
}

export type Notification_infoPk = "id";
export type Notification_infoId = Notification_info[Notification_infoPk];
export type Notification_infoCreationAttributes = Notification_infoAttributes;

export class Notification_info extends Model<Notification_infoAttributes, Notification_infoCreationAttributes> implements Notification_infoAttributes {
  id!: string;
  message!: string;

  // Notification_info hasOne Notification_group via id
  Notification_group!: Notification_group;
  getNotification_group!: Sequelize.HasOneGetAssociationMixin<Notification_group>;
  setNotification_group!: Sequelize.HasOneSetAssociationMixin<Notification_group, Notification_groupId>;
  createNotification_group!: Sequelize.HasOneCreateAssociationMixin<Notification_group>;
  // Notification_info hasOne Notification_time via id
  Notification_time!: Notification_time;
  getNotification_time!: Sequelize.HasOneGetAssociationMixin<Notification_time>;
  setNotification_time!: Sequelize.HasOneSetAssociationMixin<Notification_time, Notification_timeId>;
  createNotification_time!: Sequelize.HasOneCreateAssociationMixin<Notification_time>;
  // Notification_info hasOne Sending_type via id
  Sending_type!: Sending_type;
  getSending_type!: Sequelize.HasOneGetAssociationMixin<Sending_type>;
  setSending_type!: Sequelize.HasOneSetAssociationMixin<Sending_type, Sending_typeId>;
  createSending_type!: Sequelize.HasOneCreateAssociationMixin<Sending_type>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Notification_info {
    return Notification_info.init({
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    message: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Notification_info',
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
