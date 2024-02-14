import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { CacheMatchedOrder, CacheMatchedOrderCreationAttributes, CacheMatchedOrderId } from './CacheMatchedOrder';
import type { Chat_room, Chat_roomCreationAttributes, Chat_roomId } from './Chat_room';
import type { Departure, DepartureCreationAttributes, DepartureId } from './Departure';
import type { Destination, DestinationCreationAttributes, DestinationId } from './Destination';
import type { Order_fail, Order_failCreationAttributes, Order_failId } from './Order_fail';
import type { Pickup, PickupCreationAttributes, PickupId } from './Pickup';
import type { Product, ProductCreationAttributes, ProductId } from './Product';
import type { Transportation, TransportationCreationAttributes, TransportationId } from './Transportation';

export interface OrderAttributes {
  id: number;
  ID_REQ: string;
  ID_DVRY?: string;
  DETAIL?: string;
  PAYMENT: number;
  CHECK_RES: number;
  PICTURE?: string;
}

export type OrderPk = "id";
export type OrderId = Order[OrderPk];
export type OrderOptionalAttributes = "ID_DVRY" | "DETAIL" | "PICTURE";
export type OrderCreationAttributes = Optional<OrderAttributes, OrderOptionalAttributes>;

export class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  id!: number;
  ID_REQ!: string;
  ID_DVRY?: string;
  DETAIL?: string;
  PAYMENT!: number;
  CHECK_RES!: number;
  PICTURE?: string;

  // Order hasOne CacheMatchedOrder via id
  CacheMatchedOrder!: CacheMatchedOrder;
  getCacheMatchedOrder!: Sequelize.HasOneGetAssociationMixin<CacheMatchedOrder>;
  setCacheMatchedOrder!: Sequelize.HasOneSetAssociationMixin<CacheMatchedOrder, CacheMatchedOrderId>;
  createCacheMatchedOrder!: Sequelize.HasOneCreateAssociationMixin<CacheMatchedOrder>;
  // Order hasOne Chat_room via chat_order_id
  Chat_room!: Chat_room;
  getChat_room!: Sequelize.HasOneGetAssociationMixin<Chat_room>;
  setChat_room!: Sequelize.HasOneSetAssociationMixin<Chat_room, Chat_roomId>;
  createChat_room!: Sequelize.HasOneCreateAssociationMixin<Chat_room>;
  // Order hasOne Departure via ID
  Departure!: Departure;
  getDeparture!: Sequelize.HasOneGetAssociationMixin<Departure>;
  setDeparture!: Sequelize.HasOneSetAssociationMixin<Departure, DepartureId>;
  createDeparture!: Sequelize.HasOneCreateAssociationMixin<Departure>;
  // Order hasOne Destination via id
  Destination!: Destination;
  getDestination!: Sequelize.HasOneGetAssociationMixin<Destination>;
  setDestination!: Sequelize.HasOneSetAssociationMixin<Destination, DestinationId>;
  createDestination!: Sequelize.HasOneCreateAssociationMixin<Destination>;
  // Order hasOne Order_fail via ID
  Order_fail!: Order_fail;
  getOrder_fail!: Sequelize.HasOneGetAssociationMixin<Order_fail>;
  setOrder_fail!: Sequelize.HasOneSetAssociationMixin<Order_fail, Order_failId>;
  createOrder_fail!: Sequelize.HasOneCreateAssociationMixin<Order_fail>;
  // Order hasOne Pickup via ID
  Pickup!: Pickup;
  getPickup!: Sequelize.HasOneGetAssociationMixin<Pickup>;
  setPickup!: Sequelize.HasOneSetAssociationMixin<Pickup, PickupId>;
  createPickup!: Sequelize.HasOneCreateAssociationMixin<Pickup>;
  // Order hasOne Product via ID
  Product!: Product;
  getProduct!: Sequelize.HasOneGetAssociationMixin<Product>;
  setProduct!: Sequelize.HasOneSetAssociationMixin<Product, ProductId>;
  createProduct!: Sequelize.HasOneCreateAssociationMixin<Product>;
  // Order hasOne Transportation via ID
  Transportation!: Transportation;
  getTransportation!: Sequelize.HasOneGetAssociationMixin<Transportation>;
  setTransportation!: Sequelize.HasOneSetAssociationMixin<Transportation, TransportationId>;
  createTransportation!: Sequelize.HasOneCreateAssociationMixin<Transportation>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Order {
    return Order.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "의뢰contract 호출키"
    },
    ID_REQ: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ID_DVRY: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    DETAIL: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    PAYMENT: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CHECK_RES: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      comment: "계약 완료 여부"
    },
    PICTURE: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Order',
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
