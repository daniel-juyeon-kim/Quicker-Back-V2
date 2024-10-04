import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class JoinDate {
  @PrimaryColumn()
  id!: string;

  @Column("double", { default: Math.floor(Date.now() / 100) })
  timeStamp!: number;

  @OneToOne(() => User, (user) => user.joinDate, {
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn()
  user!: User;
}
