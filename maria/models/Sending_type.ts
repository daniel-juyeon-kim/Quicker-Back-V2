import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Notification_info, Notification_infoId } from './Notification_info';

export interface Sending_typeAttributes {
  id: string;
  sender_pickup: number;
  sender_arrival: number;
  'cons_ check': number;
  QnA_answer: number;
  notification: number;
}

export type Sending_typePk = "id";
export type Sending_typeId = Sending_type[Sending_typePk];
export type Sending_typeCreationAttributes = Sending_typeAttributes;

export class Sending_type extends Model<Sending_typeAttributes, Sending_typeCreationAttributes> implements Sending_typeAttributes {
  id!: string;
  sender_pickup!: number;
  sender_arrival!: number;
  'cons_ check'!: number;
  QnA_answer!: number;
  notification!: number;

  // Sending_type belongsTo Notification_info via id
  id_Notification_info!: Notification_info;
  getId_Notification_info!: Sequelize.BelongsToGetAssociationMixin<Notification_info>;
  setId_Notification_info!: Sequelize.BelongsToSetAssociationMixin<Notification_info, Notification_infoId>;
  createId_Notification_info!: Sequelize.BelongsToCreateAssociationMixin<Notification_info>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Sending_type {
    return Sending_type.init({
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Notification_info',
        key: 'id'
      }
    },
    sender_pickup: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    sender_arrival: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    'cons_ check': {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    QnA_answer: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    notification: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Sending_type',
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
