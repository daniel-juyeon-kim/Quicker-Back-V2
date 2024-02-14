import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Order, OrderId } from './Order';
import type { Recipient, RecipientCreationAttributes, RecipientId } from './Recipient';

export interface DestinationAttributes {
  id: number;
  X: number;
  Y: number;
  DETAIL: string;
}

export type DestinationPk = "id";
export type DestinationId = Destination[DestinationPk];
export type DestinationCreationAttributes = DestinationAttributes;

export class Destination extends Model<DestinationAttributes, DestinationCreationAttributes> implements DestinationAttributes {
  id!: number;
  X!: number;
  Y!: number;
  DETAIL!: string;

  // Destination hasOne Recipient via id
  Recipient!: Recipient;
  getRecipient!: Sequelize.HasOneGetAssociationMixin<Recipient>;
  setRecipient!: Sequelize.HasOneSetAssociationMixin<Recipient, RecipientId>;
  createRecipient!: Sequelize.HasOneCreateAssociationMixin<Recipient>;
  // Destination belongsTo Order via id
  id_Order!: Order;
  getId_Order!: Sequelize.BelongsToGetAssociationMixin<Order>;
  setId_Order!: Sequelize.BelongsToSetAssociationMixin<Order, OrderId>;
  createId_Order!: Sequelize.BelongsToCreateAssociationMixin<Order>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Destination {
    return Destination.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "의뢰contract 호출키",
      references: {
        model: 'Order',
        key: 'id'
      }
    },
    X: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    Y: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    DETAIL: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Destination',
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
