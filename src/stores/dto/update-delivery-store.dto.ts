import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateDeliveryStoreDto {

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  price_livraison: string;
}
