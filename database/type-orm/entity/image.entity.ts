import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class ProfileImage {
  @PrimaryColumn()
  id!: string;

  @Column({ default: "404" })
  imageId!: string;

  @OneToOne(() => User, (user) => user.profileImage, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user!: User;
}
