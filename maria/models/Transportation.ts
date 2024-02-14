import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Order, OrderId } from './Order';

export interface TransportationAttributes {
  ID: number;
  WALKING: number;
  BICYCLE: number;
  SCOOTER: number;
  BIKE: number;
  CAR: number;
  TRUCK: number;
}

export type TransportationPk = "ID";
export type TransportationId = Transportation[TransportationPk];
export type TransportationCreationAttributes = TransportationAttributes;

export class Transportation extends Model<TransportationAttributes, TransportationCreationAttributes> implements TransportationAttributes {
  ID!: number;
  WALKING!: number;
  BICYCLE!: number;
  SCOOTER!: number;
  BIKE!: number;
  CAR!: number;
  TRUCK!: number;

  // Transportation belongsTo Order via ID
  ID_Order!: Order;
  getID_Order!: Sequelize.BelongsToGetAssociationMixin<Order>;
  setID_Order!: Sequelize.BelongsToSetAssociationMixin<Order, OrderId>;
  createID_Order!: Sequelize.BelongsToCreateAssociationMixin<Order>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Transportation {
    return Transportation.init({
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
    WALKING: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    BICYCLE: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    SCOOTER: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    BIKE: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    CAR: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    TRUCK: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Transportation',
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
