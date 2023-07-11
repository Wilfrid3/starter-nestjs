import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDayDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Name is required.' })
    @IsString()
    name: string;
}
