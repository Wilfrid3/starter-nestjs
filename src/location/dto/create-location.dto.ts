import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateLocationDto {
    

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Longitude is required.' })
    @IsString()
    longitude: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Latitude is required.' })
    @IsString()
    latitude: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'User is required.' })
    @IsString()
    userId: string;
}
