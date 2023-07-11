import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFarmDto {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Name field is required.' })
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Owner id is required.' })
  @IsString()
  ownerId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({ required: false })
  @IsOptional()
  description?: string;
}
