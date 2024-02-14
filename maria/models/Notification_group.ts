import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Notification_info, Notification_infoId } from './Notification_info';

export interface Notification_groupAttributes {
  id: string;
  order_id?: number;
  QnA_id?: string;
  all?: string;
}

export type Notification_groupPk = "id";
export type Notification_groupId = Notification_group[Notification_groupPk];
export type Notification_groupOptionalAttributes = "order_id" | "QnA_id" | "all";
export type Notification_groupCreationAttributes = Optional<Notification_groupAttributes, Notification_groupOptionalAttributes>;

export class Notification_group extends Model<Notification_groupAttributes, Notification_groupCreationAttributes> implements Notification_groupAttributes {
  id!: string;
  order_id?: number;
  QnA_id?: string;
  all?: string;

  // Notification_group belongsTo Notification_info via id
  id_Notification_info!: Notification_info;
  getId_Notification_info!: Sequelize.BelongsToGetAssociationMixin<Notification_info>;
  setId_Notification_info!: Sequelize.BelongsToSetAssociationMixin<Notification_info, Notification_infoId>;
  createId_Notification_info!: Sequelize.BelongsToCreateAssociationMixin<Notification_info>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Notification_group {
    return Notification_group.init({
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Notification_info',
        key: 'id'
      }
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "의뢰contract 호출키"
    },
    QnA_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    all: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Notification_group',
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
