import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUnityDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Name field is required.' })
    @IsString()
    name: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    userId: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    description?: string;
}
