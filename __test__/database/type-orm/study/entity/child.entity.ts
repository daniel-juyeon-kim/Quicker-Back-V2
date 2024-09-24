import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Child {
  @PrimaryColumn()
  familyName!: string;

  @Column()
  name!: string;
}
