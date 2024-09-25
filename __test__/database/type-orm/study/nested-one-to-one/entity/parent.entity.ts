import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Child } from "./child.entity";

@Entity()
export class Parent {
  @PrimaryColumn()
  familyName!: string;

  @Column()
  name!: string;

  @OneToOne(() => Child, { cascade: ["insert"], onDelete: "CASCADE" })
  @JoinColumn({ name: "familyName" })
  child!: Child;
}
