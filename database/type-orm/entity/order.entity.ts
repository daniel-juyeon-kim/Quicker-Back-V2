import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CacheMatchedOrder } from "./cache-matched-order.entity";
import { Departure } from "./departure.entity";
import { Destination } from "./destination.entity";
import { Product } from "./product.entity";
import { Transportation } from "./transportation.entity";
import { User } from "./user.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.requestOrder, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  requester!: User;

  @ManyToOne(() => User, (user) => user.deliverOrder, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  deliver!: User;

  @Column({ nullable: true })
  detail!: string;

  @OneToOne(() => Transportation, (transportation) => transportation.order, {
    cascade: ["insert"],
  })
  transportation!: Transportation;

  @OneToOne(() => Product, (product) => product.order, {
    cascade: ["insert"],
  })
  product!: Product;

  @OneToOne(() => Destination, (destination) => destination.order, {
    cascade: ["insert"],
  })
  destination!: Destination;

  @OneToOne(() => Departure, (departure) => departure.order, {
    cascade: ["insert"],
  })
  departure!: Departure;

  @OneToOne(() => CacheMatchedOrder, (cacheMatchedOrder) => cacheMatchedOrder.order)
  cacheMatchedOrder!: CacheMatchedOrder;
}

export type BasicOrder = Pick<Order, "requester" | "detail">;
