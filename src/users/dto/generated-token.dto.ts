import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GeneratedToken {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  userId: string;
}
