import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Employee } from '../employee/employee.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Cafe {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'The unique identifier of the cafe' })
  id: string;

  @Column()
  @ApiProperty({ description: 'The name of the cafe' })
  name: string;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'A brief description of the cafe',
    required: false,
  })
  description?: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'The logo of the cafe', required: false })
  logo?: string;

  @Column()
  @ApiProperty({ description: 'The location of the cafe' })
  location: string;

  @OneToMany(() => Employee, (employee) => employee.cafe)
  @ApiProperty({
    type: () => Employee,
    isArray: true,
    description: 'The employees working at the cafe',
  })
  employees: Employee[];
}
