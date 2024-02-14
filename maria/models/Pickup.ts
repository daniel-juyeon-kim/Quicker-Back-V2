import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Order, OrderId } from './Order';

export interface PickupAttributes {
  ID: number;
  timeStamp?: number;
  CHECK?: number;
}

export type PickupPk = "ID";
export type PickupId = Pickup[PickupPk];
export type PickupOptionalAttributes = "ID" | "timeStamp" | "CHECK";
export type PickupCreationAttributes = Optional<PickupAttributes, PickupOptionalAttributes>;

export class Pickup extends Model<PickupAttributes, PickupCreationAttributes> implements PickupAttributes {
  ID!: number;
  timeStamp?: number;
  CHECK?: number;

  // Pickup belongsTo Order via ID
  ID_Order!: Order;
  getID_Order!: Sequelize.BelongsToGetAssociationMixin<Order>;
  setID_Order!: Sequelize.BelongsToSetAssociationMixin<Order, OrderId>;
  createID_Order!: Sequelize.BelongsToCreateAssociationMixin<Order>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Pickup {
    return Pickup.init({
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
    timeStamp: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "초단위"
    },
    CHECK: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Pickup',
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
