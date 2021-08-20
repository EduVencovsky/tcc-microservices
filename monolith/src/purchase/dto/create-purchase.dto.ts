import { User } from 'src/user/entities/user.entity';
import { IsNumber, Min } from 'class-validator';

export class CreatePurchaseDto {
  @Min(1)
  @IsNumber()
  id: number;

  @Min(1)
  @IsNumber()
  userId: User['id'];
}
