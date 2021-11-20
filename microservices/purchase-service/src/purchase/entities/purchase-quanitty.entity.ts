import { Column, Entity, ManyToOne } from 'typeorm';

import { Purchase } from './purchase.entity';
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class PurchaseQuantity {
  @ManyToOne(() => Purchase, { primary: true })
  purchase: Purchase;

  @ManyToOne(() => Product, { primary: true })
  product: Product;

  @Column()
  quantity: number;
}
