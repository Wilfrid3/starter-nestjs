import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsEmail } from 'class-validator';

export class AddLaboratoryDto {
    
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Name field is required.' })
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Profil is required.' })
  @IsString()
  profil: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'User is required.' })
  @IsString()
  users: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'City is required.' })
  @IsString()
  city: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Country is required.' })
  @IsString()
  country: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Agreement is required.' })
  @IsString()
  agreement: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Contribuable Number is required.' })
  @IsString()
  numcontrib: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  image: string;
}
