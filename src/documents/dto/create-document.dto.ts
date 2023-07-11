import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateDocumentDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Transaction field is required.' })
    @IsString()
    transaction: string;
    
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'User field is required.' })
    @IsString()
    user: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Sheet field is required.' })
    @IsString()
    sheet: string;
}
