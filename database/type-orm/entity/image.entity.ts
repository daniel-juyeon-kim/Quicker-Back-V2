import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("Image")
export class Image {
  @PrimaryColumn()
  id!: string;

  @Column({ default: "404" })
  imageId!: string;
}
