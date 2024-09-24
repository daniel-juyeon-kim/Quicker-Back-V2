import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class ChatMessage {
  @PrimaryColumn({ type: "date" })
  date!: string;

  @Column()
  message!: string;
}
