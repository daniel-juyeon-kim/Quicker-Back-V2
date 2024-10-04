import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Recipient } from "./recipient.entity";

@Entity()
export class Destination {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("double")
  x!: number;

  @Column("double")
  y!: number;

  @Column()
  detail!: string;

  @OneToOne(() => Order, (order) => order.destination, {
    cascade: ["insert"],
    onDelete: "CASCADE",
  })
  @JoinColumn()
  order!: Order;

  @OneToOne(() => Recipient, (recipient) => recipient.destination, {
    cascade: ["insert"],
  })
  recipient!: Recipient;
}

export type BasicDestination = Omit<Destination, "id" | "order" | "recipient">;
