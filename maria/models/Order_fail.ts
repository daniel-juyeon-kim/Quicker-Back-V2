import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Order, OrderId } from './Order';

export interface Order_failAttributes {
  ID: number;
  BOOL_FAIL: number;
  PICTURE_FAIL?: string;
  RSN_FAIL?: string;
}

export type Order_failPk = "ID";
export type Order_failId = Order_fail[Order_failPk];
export type Order_failOptionalAttributes = "ID" | "PICTURE_FAIL" | "RSN_FAIL";
export type Order_failCreationAttributes = Optional<Order_failAttributes, Order_failOptionalAttributes>;

export class Order_fail extends Model<Order_failAttributes, Order_failCreationAttributes> implements Order_failAttributes {
  ID!: number;
  BOOL_FAIL!: number;
  PICTURE_FAIL?: string;
  RSN_FAIL?: string;

  // Order_fail belongsTo Order via ID
  ID_Order!: Order;
  getID_Order!: Sequelize.BelongsToGetAssociationMixin<Order>;
  setID_Order!: Sequelize.BelongsToSetAssociationMixin<Order, OrderId>;
  createID_Order!: Sequelize.BelongsToCreateAssociationMixin<Order>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Order_fail {
    return Order_fail.init({
    ID: {
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
    BOOL_FAIL: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    PICTURE_FAIL: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    RSN_FAIL: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Order_fail',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
  }
}
