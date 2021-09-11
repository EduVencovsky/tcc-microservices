import { IsNumber, Min } from 'class-validator';

import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends CreateProductDto {
  @IsNumber()
  @Min(1)
  id: number;
}
