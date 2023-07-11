import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSpecialityDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Libelle field is required.' })
    @IsString()
    libelle: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    description?: string;
}
