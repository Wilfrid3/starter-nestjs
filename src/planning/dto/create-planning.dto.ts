import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreatePlanningDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'User is required.' })
    @IsString()
    userId: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description: string;
}
