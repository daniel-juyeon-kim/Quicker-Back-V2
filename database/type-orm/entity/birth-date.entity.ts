import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";

export type BasicBirthDate = Omit<BirthDate, "user">;

@Entity("Birth_date")
export class BirthDate {
  @PrimaryColumn()
  id!: string;

  @Column({ type: "date" })
  date!: string;

  @OneToOne(() => User, (user) => user.birthDate)
  @JoinColumn()
  user!: User;
}
