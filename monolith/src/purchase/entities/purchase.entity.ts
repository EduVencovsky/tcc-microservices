import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'src/user/entities/user.entity';
import { DateTrack } from 'src/base/embedded/date-track.embedded';
import { PurchaseQuantity } from './purchase-quanitty.entity';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @OneToMany(
    () => PurchaseQuantity,
    (purchaseQuantity) => purchaseQuantity.purchase,
  )
  productQuantity: PurchaseQuantity[];

  @Column(() => DateTrack)
  date: DateTrack;
}
