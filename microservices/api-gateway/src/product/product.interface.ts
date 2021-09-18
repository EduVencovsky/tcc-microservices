import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ type: String })
  name: string;
}

export class UpdateProductDto extends CreateProductDto {}
