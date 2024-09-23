import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { BirthDate } from "./birth-date.entity";
import { Image } from "./image.entity";
import { JoinDate } from "./join-date.entity";
import { Order } from "./order.entity";

@Entity("User")
export class User {
  @PrimaryColumn()
  id!: string;

  @Column()
  wallet_address!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  contact!: string;

  @OneToOne(() => Image, { cascade: ["insert"], nullable: false, onDelete: "CASCADE", orphanedRowAction: "delete" })
  @JoinColumn({ name: "id" })
  image!: Image;

  @OneToOne(() => JoinDate, { cascade: ["insert"], nullable: false, onDelete: "CASCADE", orphanedRowAction: "delete" })
  @JoinColumn({ name: "id" })
  joinDate!: JoinDate;

  @OneToOne(() => BirthDate, { cascade: ["insert"], nullable: false, onDelete: "CASCADE", orphanedRowAction: "delete" })
  @JoinColumn({ name: "id" })
  birthDate!: BirthDate;

  @OneToMany(() => Order, (order) => order.requesterId, { nullable: true, orphanedRowAction: "delete" })
  requestOrder!: Order[];

  @OneToMany(() => Order, (order) => order.deliverId, { nullable: true, orphanedRowAction: "delete" })
  deliverOrder!: Order[];
}
