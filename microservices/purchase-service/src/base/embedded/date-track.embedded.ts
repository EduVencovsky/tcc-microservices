import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class DateTrack {
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
