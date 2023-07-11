import { IsNotEmpty, IsOptional, IsString, IsEmail, IsInt, IsArray } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateAgroExpertDto {

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Name field is required.' })
    @IsString()
    name: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    longitude: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    latitude: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    level: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    price: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Specialite is required.' })
    @IsString()
    specialite: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Email field is required.' })
    @IsEmail()
    email: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Phone field is required.' })
    @IsString()
    phone: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'City is required.' })
    @IsString()
    city: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Country is required.' })
    @IsString()
    country: string;

    @ApiProperty({ required: false })
    @IsOptional()
    image: string;
}
