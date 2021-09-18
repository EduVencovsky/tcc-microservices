import { ApiProperty } from '@nestjs/swagger';

export class Address {
  @ApiProperty({ type: String })
  state: string;

  @ApiProperty({ type: String })
  country: string;

  @ApiProperty({ type: String })
  street: string;

  @ApiProperty({ type: Number })
  number: number;

  @ApiProperty({ type: Number })
  postalCode: number;
}

export class CreateUserDto {
  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: String })
  password: string;

  @ApiProperty({ type: String })
  firstName: string;

  @ApiProperty({ type: String })
  lastName: string;

  @ApiProperty({ type: Address })
  address: Address;
}

export class UpdateUserDto extends CreateUserDto {
  @ApiProperty({ type: Number })
  id: number;
}
