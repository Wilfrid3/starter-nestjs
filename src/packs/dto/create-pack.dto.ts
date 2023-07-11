import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePackDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Libelle is required.' })
    @IsString()
    libelle: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Number Period is required.' })
    @IsInt()
    numberPeriod: number;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Credit is required.' })
    @IsInt()
    credit: number;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Period is required.' })
    @IsString()
    period: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Price is required.' })
    @IsInt()
    price: number

    @ApiProperty({ required: false })
    @IsOptional()
    @IsInt()
    free: number
}
