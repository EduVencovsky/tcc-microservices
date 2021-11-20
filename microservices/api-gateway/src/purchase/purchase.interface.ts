import { ApiProperty } from '@nestjs/swagger';

export class PurchaseQuantityInput {
  @ApiProperty({ type: Number })
  quantity: number;

  @ApiProperty({ type: String })
  productId: string;
}

export class CreatePurchaseDto {
  @ApiProperty({ type: String })
  userId: string;

  @ApiProperty({ type: PurchaseQuantityInput })
  productQuantity: PurchaseQuantityInput[];
}

export class UpdatePurchaseDto extends CreatePurchaseDto {}
