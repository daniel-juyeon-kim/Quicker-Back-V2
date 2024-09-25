import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Profile } from "./profile.entity";
import { UserMetaData } from "./user-meta-data.entity";

@Entity()
export class User {
  @PrimaryColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToOne(() => Profile, { cascade: ["insert"], onDelete: "CASCADE" })
  @JoinColumn({ name: "id" })
  profile!: Profile;

  @OneToOne(() => UserMetaData, { cascade: ["insert"], onDelete: "CASCADE" })
  @JoinColumn({ name: "id" })
  metaData!: UserMetaData;
}
