import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/user/entities/user.entity';
import { DateTrack } from 'src/base/embedded/date-track.embedded';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column(() => DateTrack)
  date: DateTrack;
}
