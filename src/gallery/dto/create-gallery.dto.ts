import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsEmail, IsInt } from 'class-validator';

export class CreateGalleryDto {

    @ApiProperty({ required: false })
    @IsOptional({ message: 'Name field is required.' })
    @IsString()
    title: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    image: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    expert: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    laboratory: string;
}
