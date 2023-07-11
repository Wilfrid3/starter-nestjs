import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEquipmentDto {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Name field is required.' })
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Type Equipment is required.' })
  @IsString()
  typequipmentId: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Location is required.' })
  @IsString()
  location: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Phone is required.' })
  @IsString()
  phone: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  deviceId: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Coordinate is required.' })
  @IsString()
  coordinate: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Farm is required.' })
  @IsString()
  farmId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  description?: string;
}
