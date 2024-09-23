import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("Birth_date")
export class BirthDate {
  @PrimaryColumn()
  id!: string;

  @Column()
  year!: number;

  @Column()
  month!: number;

  @Column()
  date!: number;
}
