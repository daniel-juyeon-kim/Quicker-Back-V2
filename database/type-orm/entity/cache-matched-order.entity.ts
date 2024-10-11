import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class CacheMatchedOrder {
  @PrimaryColumn()
  id!: number;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  date!: Date;

  @OneToOne(() => Order, (order) => order.cacheMatchedOrder, {
    cascade: ["insert"],
    onDelete: "CASCADE",
  })
  @JoinColumn()
  order!: Order;
}
