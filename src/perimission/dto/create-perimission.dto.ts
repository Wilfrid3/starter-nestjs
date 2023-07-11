import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePerimissionDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Name field is required.' })
    @IsString()
    name: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Code field is required.' })
    @Type(() => Number)
    @IsInt()
    code: number;
}
