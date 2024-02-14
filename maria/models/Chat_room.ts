import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Order, OrderId } from './Order';

export interface Chat_roomAttributes {
  chat_order_id: number;
  request_id: string;
  delivery_id: string;
}

export type Chat_roomPk = "chat_order_id";
export type Chat_roomId = Chat_room[Chat_roomPk];
export type Chat_roomOptionalAttributes = "chat_order_id";
export type Chat_roomCreationAttributes = Optional<Chat_roomAttributes, Chat_roomOptionalAttributes>;

export class Chat_room extends Model<Chat_roomAttributes, Chat_roomCreationAttributes> implements Chat_roomAttributes {
  chat_order_id!: number;
  request_id!: string;
  delivery_id!: string;

  // Chat_room belongsTo Order via chat_order_id
  chat_order!: Order;
  getChat_order!: Sequelize.BelongsToGetAssociationMixin<Order>;
  setChat_order!: Sequelize.BelongsToSetAssociationMixin<Order, OrderId>;
  createChat_order!: Sequelize.BelongsToCreateAssociationMixin<Order>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Chat_room {
    return Chat_room.init({
    chat_order_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "의뢰contract 호출키",
      references: {
        model: 'Order',
        key: 'id'
      }
    },
    request_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "UserID"
    },
    delivery_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "UserID"
    }
  }, {
    sequelize,
    tableName: 'Chat_room',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "chat_order_id" },
        ]
      },
    ]
  });
  }
}
