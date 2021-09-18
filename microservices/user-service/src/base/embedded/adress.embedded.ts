import { Column } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class Address {
  @Column()
  @IsString()
  @IsNotEmpty()
  state: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  country: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  street: string;

  @Min(1)
  @Column()
  @IsNumber()
  number: number;

  @Min(1)
  @Column()
  @IsNumber()
  postalCode: number;
}
