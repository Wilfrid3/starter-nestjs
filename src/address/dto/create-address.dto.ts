import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateAddressDto {

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'User is required.' })
    @IsString()
    ownerId: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    phone: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    location: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    quarter: string;
}
