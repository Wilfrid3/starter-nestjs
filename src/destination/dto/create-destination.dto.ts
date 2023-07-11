import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDestinationDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Depart field is required.' })
    @IsString()
    depart: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    departCoord: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    arrivalCoord: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Arrival field is required.' })
    @IsString()
    arrival: string;
}
