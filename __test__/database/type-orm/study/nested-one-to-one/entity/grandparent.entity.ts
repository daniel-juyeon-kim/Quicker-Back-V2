import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Parent } from "./parent.entity";

@Entity()
export class GrandParent {
  @PrimaryColumn()
  familyName!: string;

  @Column()
  name!: string;

  @OneToOne(() => Parent, { cascade: ["insert"], onDelete: "CASCADE" })
  @JoinColumn({ name: "familyName" })
  parent!: Parent;
}
