import { ArrayNotEmpty, IsArray, IsNumber, Min } from 'class-validator';

import { User } from 'src/user/entities/user.entity';
import { PurchaseQuantityInput } from './purchase-quantity.dto';

export class CreatePurchaseDto {
  @Min(1)
  @IsNumber()
  userId: User['id'];

  @IsArray()
  @ArrayNotEmpty()
  productQuantity: PurchaseQuantityInput[];
}
