import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class Product {
  @PrimaryColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToOne(() => Order, (order) => order.product, { cascade: ["insert"], onDelete: "CASCADE", nullable: false })
  order!: Order;
}
