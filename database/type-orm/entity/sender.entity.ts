import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Departure } from "./departure.entity";

@Entity()
export class Sender {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  phone!: string;

  @OneToOne(() => Departure, (departure) => departure.sender, {
    cascade: ["insert"],
    onDelete: "CASCADE",
  })
  @JoinColumn()
  departure!: Departure;
}

export type BasicSender = Omit<Sender, "id" | "departure">;