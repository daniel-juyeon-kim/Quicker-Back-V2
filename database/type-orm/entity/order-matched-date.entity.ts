import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Order } from "..";

@Entity()
export class DeliveryPersonMatchedDate {
  @PrimaryColumn()
  id!: number;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  date!: Date;

  @OneToOne(() => Order, (order) => order.deliveryPersonMatchedDate, {
    cascade: ["insert"],
    onDelete: "CASCADE",
  })
  @JoinColumn()
  order!: Order;
}
