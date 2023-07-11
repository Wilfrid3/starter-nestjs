import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCostDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Price is required.' })
    @IsNumber()
    price: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Type of vehicle is required.' })
    @IsString()
    typevehicleId: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Destination is required.' })
    @IsString()
    destinationId: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'User is required.' })
    @IsString()
    userId: string;
}
