import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSensorKalioDto {
    
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Name field is required.' })
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Type Data is required.' })
  @IsString()
  typdataId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  description?: string;
}
