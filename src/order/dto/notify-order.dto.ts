import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsArray, ArrayMaxSize } from 'class-validator';

export class NotifyOrderDto {

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'User is required.' })
    @IsString()
    to: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Message is required.' })
    @IsString()
    message: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    title: string;
}
