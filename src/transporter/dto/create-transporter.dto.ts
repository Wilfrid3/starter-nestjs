import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTransporterDto {
    
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Name field is required.' })
    @IsString()
    name: string;
    
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Agency field is required.' })
    @IsString()
    agency: string;
      
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    idcard: string;
      
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    age: string;
      
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    address: string;
      
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    licence: string;
      
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Phone field is required.' })
    @IsString()
    phone: string;
  
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'City is required.' })
    @IsString()
    licenceDate: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    image: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    imagecard: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    cardrecto: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    cardverso: string;
}
