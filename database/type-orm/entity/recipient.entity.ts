import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Destination } from "./destination.entity";

@Entity()
export class Recipient {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  phone!: string;

  @OneToOne(() => Destination, (destination) => destination.recipient, {
    cascade: ["insert"],
    onDelete: "CASCADE",
  })
  @JoinColumn()
  destination!: Destination;
}

export type BasicRecipient = Omit<Recipient, "id" | "destination">;
