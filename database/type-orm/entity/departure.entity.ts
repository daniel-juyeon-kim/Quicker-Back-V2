import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Sender } from "./sender.entity";

@Entity()
export class Departure {
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

  @OneToOne(() => Sender, (sender) => sender.departure, {
    cascade: ["insert"],
    onDelete: "CASCADE",
  })
  sender!: Sender;
}

export type BasicDeparture = Omit<Departure, "id" | "order" | "sender">;
