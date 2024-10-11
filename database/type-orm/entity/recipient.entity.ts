import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Destination } from "./destination.entity";

@Entity()
export class Recipient {
  @PrimaryColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  phone!: string;

  @OneToOne(() => Destination, (destination) => destination.recipient, {
    cascade: ["insert"],
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  destination!: Destination;
}

export type BasicRecipient = Omit<Recipient, "id" | "destination">;
