import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Name field is required.' })
    @IsString()
    name: string;
  
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'User is required.' })
    @IsString()
    userId: string;
  
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'main Category is required.' })
    @IsString()
    maincategory: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    image: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    description?: string;
  
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
