import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSensorDto {
    
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Name field is required.' })
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Type Data is required.' })
  @IsString()
  typdataId: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Equipment is required.' })
  @IsString()
  equipmentId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  description?: string;
}
