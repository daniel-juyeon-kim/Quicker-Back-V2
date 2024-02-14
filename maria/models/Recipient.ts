import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Destination, DestinationId } from './Destination';

export interface RecipientAttributes {
  id: number;
  NAME: string;
  PHONE: string;
}

export type RecipientPk = "id";
export type RecipientId = Recipient[RecipientPk];
export type RecipientCreationAttributes = RecipientAttributes;

export class Recipient extends Model<RecipientAttributes, RecipientCreationAttributes> implements RecipientAttributes {
  id!: number;
  NAME!: string;
  PHONE!: string;

  // Recipient belongsTo Destination via id
  id_Destination!: Destination;
  getId_Destination!: Sequelize.BelongsToGetAssociationMixin<Destination>;
  setId_Destination!: Sequelize.BelongsToSetAssociationMixin<Destination, DestinationId>;
  createId_Destination!: Sequelize.BelongsToCreateAssociationMixin<Destination>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Recipient {
    return Recipient.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "의뢰contract 호출키",
      references: {
        model: 'Destination',
        key: 'id'
      }
    },
    NAME: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    PHONE: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Recipient',
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
