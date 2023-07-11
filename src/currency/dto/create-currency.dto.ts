import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateCurrencyDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Name field is required.' })
    @IsString()
    name: string;
  
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'User is required.' })
    @IsString()
    userId: string;
  
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    code: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    description?: string;
}
