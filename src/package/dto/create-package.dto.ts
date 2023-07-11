import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePackageDto {
    
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Name is required.' })
    @IsString()
    name: string;
    
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'User ID is required.' })
    @IsString()
    userId: string;
    
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'End Date is required.' })
    @IsString()
    endDate: string;
    
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Start Date is required.' })
    @IsString()
    startDate: string;
    
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Reference is required.' })
    @IsString()
    ref: string;
}
