import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Order, OrderId } from './Order';
import type { Sender, SenderCreationAttributes, SenderId } from './Sender';

export interface DepartureAttributes {
  ID: number;
  X: number;
  Y: number;
  DETAIL: string;
}

export type DeparturePk = "ID";
export type DepartureId = Departure[DeparturePk];
export type DepartureCreationAttributes = DepartureAttributes;

export class Departure extends Model<DepartureAttributes, DepartureCreationAttributes> implements DepartureAttributes {
  ID!: number;
  X!: number;
  Y!: number;
  DETAIL!: string;

  // Departure hasOne Sender via ID
  Sender!: Sender;
  getSender!: Sequelize.HasOneGetAssociationMixin<Sender>;
  setSender!: Sequelize.HasOneSetAssociationMixin<Sender, SenderId>;
  createSender!: Sequelize.HasOneCreateAssociationMixin<Sender>;
  // Departure belongsTo Order via ID
  ID_Order!: Order;
  getID_Order!: Sequelize.BelongsToGetAssociationMixin<Order>;
  setID_Order!: Sequelize.BelongsToSetAssociationMixin<Order, OrderId>;
  createID_Order!: Sequelize.BelongsToCreateAssociationMixin<Order>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Departure {
    return Departure.init({
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
    tableName: 'Departure',
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
