import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @Min(1)
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}
