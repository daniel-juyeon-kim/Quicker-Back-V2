import { Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class Order {
  @PrimaryColumn()
  id!: number;

  @OneToOne(() => Product, (product) => product.order, { cascade: ["insert"], onDelete: "CASCADE", nullable: false })
  @JoinColumn()
  product!: Product;
}
