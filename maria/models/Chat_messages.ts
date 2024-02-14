import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Chat_data, Chat_dataCreationAttributes, Chat_dataId } from './Chat_data';

export interface Chat_messagesAttributes {
  id: string;
  messages_order_id: number;
  sender_id: string;
  message_detail: string;
  checked_message: number;
}

export type Chat_messagesPk = "id";
export type Chat_messagesId = Chat_messages[Chat_messagesPk];
export type Chat_messagesCreationAttributes = Chat_messagesAttributes;

export class Chat_messages extends Model<Chat_messagesAttributes, Chat_messagesCreationAttributes> implements Chat_messagesAttributes {
  id!: string;
  messages_order_id!: number;
  sender_id!: string;
  message_detail!: string;
  checked_message!: number;

  // Chat_messages hasOne Chat_data via id
  Chat_datum!: Chat_data;
  getChat_datum!: Sequelize.HasOneGetAssociationMixin<Chat_data>;
  setChat_datum!: Sequelize.HasOneSetAssociationMixin<Chat_data, Chat_dataId>;
  createChat_datum!: Sequelize.HasOneCreateAssociationMixin<Chat_data>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Chat_messages {
    return Chat_messages.init({
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    messages_order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "의뢰contract 호출키"
    },
    sender_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    message_detail: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    checked_message: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Chat_messages',
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
