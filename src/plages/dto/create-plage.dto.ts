import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreatePlageDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Planning is required.' })
    @IsString()
    planningId: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Day is required.' })
    @IsString()
    dayId: string;
  
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    start: string;
  
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    end: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsInt()
    etat: number;
}
