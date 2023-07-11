import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateVehicleDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Name is required.' })
    @IsString()
    name: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    image: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    image1: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    image2: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    image3: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Marque is required.' })
    @IsString()
    marque: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    year: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    immatriculation: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Model is required.' })
    @IsString()
    model: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Capacity is required.' })
    @IsString()
    capacity: number;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Unity is required.' })
    @IsString()
    unityId: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Type of Vehicle is required.' })
    @IsString()
    typevehicleId: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'User is required.' })
    @IsString()
    userId: string;
}
