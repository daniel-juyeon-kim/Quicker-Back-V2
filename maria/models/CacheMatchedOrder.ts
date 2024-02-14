import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Order, OrderId } from './Order';

export interface CacheMatchedOrderAttributes {
  id: number;
  date: string;
}

export type CacheMatchedOrderPk = "id";
export type CacheMatchedOrderId = CacheMatchedOrder[CacheMatchedOrderPk];
export type CacheMatchedOrderCreationAttributes = CacheMatchedOrderAttributes;

export class CacheMatchedOrder extends Model<CacheMatchedOrderAttributes, CacheMatchedOrderCreationAttributes> implements CacheMatchedOrderAttributes {
  id!: number;
  date!: string;

  // CacheMatchedOrder belongsTo Order via id
  id_Order!: Order;
  getId_Order!: Sequelize.BelongsToGetAssociationMixin<Order>;
  setId_Order!: Sequelize.BelongsToSetAssociationMixin<Order, OrderId>;
  createId_Order!: Sequelize.BelongsToCreateAssociationMixin<Order>;

  static initModel(sequelize: Sequelize.Sequelize): typeof CacheMatchedOrder {
    return CacheMatchedOrder.init({
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
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'CacheMatchedOrder',
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
