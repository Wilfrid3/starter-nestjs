import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateDataEquipmentDto {

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsInt()
    data: Number;
  
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Sensor is required.' })
    @IsString()
    sensor: string;
}
