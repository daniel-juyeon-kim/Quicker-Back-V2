import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Order, OrderId } from './Order';

export interface ProductAttributes {
  ID: number;
  WIDTH: number;
  LENGTH: number;
  HEIGHT: number;
  WEIGHT: number;
}

export type ProductPk = "ID";
export type ProductId = Product[ProductPk];
export type ProductCreationAttributes = ProductAttributes;

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  ID!: number;
  WIDTH!: number;
  LENGTH!: number;
  HEIGHT!: number;
  WEIGHT!: number;

  // Product belongsTo Order via ID
  ID_Order!: Order;
  getID_Order!: Sequelize.BelongsToGetAssociationMixin<Order>;
  setID_Order!: Sequelize.BelongsToSetAssociationMixin<Order, OrderId>;
  createID_Order!: Sequelize.BelongsToCreateAssociationMixin<Order>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Product {
    return Product.init({
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "의뢰contract 호출키",
      references: {
        model: 'Order',
        key: 'id'
      }
    },
    WIDTH: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    LENGTH: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    HEIGHT: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    WEIGHT: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Product',
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
