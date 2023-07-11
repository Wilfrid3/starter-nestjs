import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTutorialDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Name field is required.' })
    @IsString()
    name: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Type of Post field is required.' })
    @IsString()
    typepostId: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Lien field is required.' })
    @IsString()
    lien: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description: string;
}
