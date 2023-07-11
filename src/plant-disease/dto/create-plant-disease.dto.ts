import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePlantDiseaseDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Name field is required.' })
    @IsString()
    name: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    precaution: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    image: string;
  
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'plantType is required.' })
    @IsString()
    plantType: string;
}
