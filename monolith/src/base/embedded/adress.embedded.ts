import { Column } from 'typeorm';

export class Address {
  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  postalCode: number;
}
