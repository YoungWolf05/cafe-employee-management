import { Cafe } from '../cafe/cafe.entity';
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Employee {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email_address: string;

  @Column()
  phone_number: string;

  @Column()
  gender: string;

  @Column()
  start_date: Date;

  @ManyToOne(() => Cafe, (cafe) => cafe.employees)
  cafe?: Cafe;

  @BeforeInsert()
  generateCustomId() {
    // Prepend 'UI' to a UUID to get a unique alphanumeric ID
    this.id = `UI${uuidv4().replace(/-/g, '').slice(0, 7).toUpperCase()}`;
  }
}
