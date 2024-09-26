import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("Image")
export class Image {
  @PrimaryColumn()
  id!: string;

  @Column({ default: "404" })
  imageId!: string;

  @OneToOne(() => User, (user) => user.image, { cascade: ["insert"], nullable: false, onDelete: "CASCADE" })
  @JoinColumn()
  user!: User;
}
