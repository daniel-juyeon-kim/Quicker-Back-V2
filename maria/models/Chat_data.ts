import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Chat_messages, Chat_messagesId } from './Chat_messages';

export interface Chat_dataAttributes {
  id: string;
  timeStamp: number;
}

export type Chat_dataPk = "id";
export type Chat_dataId = Chat_data[Chat_dataPk];
export type Chat_dataCreationAttributes = Chat_dataAttributes;

export class Chat_data extends Model<Chat_dataAttributes, Chat_dataCreationAttributes> implements Chat_dataAttributes {
  id!: string;
  timeStamp!: number;

  // Chat_data belongsTo Chat_messages via id
  id_Chat_message!: Chat_messages;
  getId_Chat_message!: Sequelize.BelongsToGetAssociationMixin<Chat_messages>;
  setId_Chat_message!: Sequelize.BelongsToSetAssociationMixin<Chat_messages, Chat_messagesId>;
  createId_Chat_message!: Sequelize.BelongsToCreateAssociationMixin<Chat_messages>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Chat_data {
    return Chat_data.init({
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Chat_messages',
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
    tableName: 'Chat_data',
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
