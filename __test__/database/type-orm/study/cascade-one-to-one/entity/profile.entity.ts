import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Profile {
  @PrimaryColumn()
  id!: number;

  @Column()
  gender!: string;

  @Column()
  photo!: string;
}
