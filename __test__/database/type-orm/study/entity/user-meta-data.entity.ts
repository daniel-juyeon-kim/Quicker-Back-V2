import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class UserMetaData {
  @PrimaryColumn()
  id!: number;

  @Column()
  isLogin!: boolean;
}
