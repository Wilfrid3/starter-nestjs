import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateContactDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  fullname: string;
  
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Email field is required.' })
  @IsString()
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Phone field is required.' })
  @IsString()
  phone: string;
  
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  message: string;
}
