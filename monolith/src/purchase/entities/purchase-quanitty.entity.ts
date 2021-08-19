import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

import { Purchase } from './purchase.entity';
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class PurchaseQuantity {
  @ManyToOne(() => Purchase, { primary: true })
  purchase: Purchase;

  @ManyToMany(() => Product, { primary: true })
  product: Product;

  @Column()
  quantity: number;
}
