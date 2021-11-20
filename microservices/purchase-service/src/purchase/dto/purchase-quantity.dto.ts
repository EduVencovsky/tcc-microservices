import { IsNumber, Min } from 'class-validator';

import { Product } from 'src/product/entities/product.entity';

export class PurchaseQuantityInput {
  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(1)
  productId: Product['id'];
}
