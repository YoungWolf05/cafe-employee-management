import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCafeDto {
  @ApiProperty({ description: 'Name of the cafe' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Description of the cafe' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Logo URL of the cafe' })
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiProperty({ description: 'Location of the cafe' })
  @IsNotEmpty()
  @IsString()
  location: string;
}
