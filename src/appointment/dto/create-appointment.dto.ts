import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateAppointmentDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Message is required.' })
    @IsString()
    message: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsInt()
    etat: number;
    
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    amount: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'User is required.' })
    @IsString()
    user: string;
  
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Ref is required.' })
    @IsString()
    ref: string;
  
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Service is required.' })
    @IsString()
    service: string;
  
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Range is required.' })
    @IsString()
    range: string;
  
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Laboratory is required.' })
    @IsString()
    laboratory: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    image: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    bookDate: string;
}
