import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PostDeviceData {

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    token: string;
  
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Device ID is required.' })
    @IsString()
    deviceId: string;
  
    @ApiProperty({ required: true })
    @IsOptional()
    @IsString()
    sensor1: string;
  
    @ApiProperty({ required: true })
    @IsOptional()
    @IsString()
    sensor2: string;
  
    @ApiProperty({ required: true })
    @IsOptional()
    @IsString()
    sensor3: string;
  
    @ApiProperty({ required: true })
    @IsOptional()
    @IsString()
    sensor4: string;
  
    @ApiProperty({ required: true })
    @IsOptional()
    @IsString()
    sensor5: string;
  
    @ApiProperty({ required: true })
    @IsOptional()
    @IsString()
    sensor6: string;
}
