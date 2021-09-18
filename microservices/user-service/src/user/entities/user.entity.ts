import {
  Min,
  IsNumber,
  IsString,
  IsNotEmpty,
  IsNotEmptyObject,
} from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { Address } from 'src/base/embedded/adress.embedded';

@Entity()
export class User {
  @Min(1)
  @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNotEmptyObject()
  @Column(() => Address)
  address: Address;
}
