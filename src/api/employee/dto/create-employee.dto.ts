import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  IsIn,
} from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({ description: 'Name of the employee' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Email address of the employee' })
  @IsEmail()
  email_address: string;

  @ApiProperty({ description: 'Phone number of the employee' })
  @IsPhoneNumber()
  phone_number: string;

  @ApiProperty({
    description: 'Gender of the employee',
    enum: ['Male', 'Female'],
  })
  @IsIn(['Male', 'Female'])
  gender: string;

  @ApiPropertyOptional({ description: 'Cafe associated with the employee' })
  @IsString()
  cafe?: string;
}
