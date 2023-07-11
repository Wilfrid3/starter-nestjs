import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray, IsOptional, IsString } from 'class-validator';

export class CreateMainCategoryDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Name field is required.' })
    @IsString()
    name: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Profile ids is required.' })
    @IsString()
    profils: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    image: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    description?: string  
    @ApiProperty({ required: false })
    @IsOptional()
    place?: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    yield?: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    cycle?: string;
}
