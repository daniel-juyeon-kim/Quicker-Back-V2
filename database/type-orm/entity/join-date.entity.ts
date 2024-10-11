import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class JoinDate {
  @PrimaryColumn()
  id!: string;

  @Column("datetime", { default: new Date().toISOString() })
  date!: Date;

  @OneToOne(() => User, (user) => user.joinDate, {
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn()
  user!: User;
}
