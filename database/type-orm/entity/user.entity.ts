import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { BirthDate } from "./birth-date.entity";
import { ProfileImage } from "./image.entity";
import { JoinDate } from "./join-date.entity";
import { Order } from "./order.entity";

@Entity()
export class User {
  @PrimaryColumn()
  id!: string;

  @Column()
  walletAddress!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column({ unique: true })
  contact!: string;

  @OneToOne(() => ProfileImage, (profileImage) => profileImage.user, {
    cascade: ["insert"],
  })
  profileImage!: ProfileImage;

  @OneToOne(() => JoinDate, (joinDate) => joinDate.user, {
    cascade: ["insert"],
  })
  joinDate!: JoinDate;

  @OneToOne(() => BirthDate, (birthDate) => birthDate.user, {
    cascade: ["insert"],
  })
  birthDate!: BirthDate;

  @OneToMany(() => Order, (order) => order.requester)
  requestOrder!: Order[];

  @OneToMany(() => Order, (order) => order.deliver)
  deliverOrder!: Order[];
}
