import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AssignTransporterDto {
    
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'User field is required.' })
    @IsString()
    user: string;
    
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Vehicle field is required.' })
    @IsString()
    vehicle: string;
}
