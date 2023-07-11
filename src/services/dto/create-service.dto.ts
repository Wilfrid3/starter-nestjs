import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Name field is required.' })
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Icon field is required.' })
  @IsString()
  icon: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description: string;
}
