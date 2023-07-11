import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class CreatePartnerDto {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'First Name field is required.' })
  @IsString()
  firstname: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Last Name field is required.' })
  @IsString()
  lastname: string;
    
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  about: string;
      
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  numcontrib: string;
      
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  agreement: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Website is required.' })
  @IsUrl()
  website: string;
    
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
  @IsNotEmpty({ message: 'Region is required.' })
  @IsString()
  region: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Company Name is required.' })
  @IsString()
  companyname: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Sepeciality is required.' })
  @IsString()
  speciality: string;

  @ApiProperty({ required: false })
  @IsOptional({ message: 'Code Postal is required.' })
  @IsString()
  postalcode: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Country is required.' })
  @IsString()
  country: string;

  @ApiProperty({ required: false })
  @IsOptional()
  image: string;
}
