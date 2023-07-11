import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePostDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Name is required.' })
    @IsString()
    name: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    image: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Link is required.' })
    @IsString()
    lien: string;

    @ApiProperty({ required: true })
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Post Date is required.' })
    @IsString()
    postDate: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Type of Post is required.' })
    @IsString()
    typepostId: string;
}
