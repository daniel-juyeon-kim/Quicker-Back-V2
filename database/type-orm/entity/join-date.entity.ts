import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("Join_date")
export class JoinDate {
  @PrimaryColumn()
  id!: string;

  @Column("double", { default: Math.floor(Date.now() / 100) })
  timeStamp!: number;
}
