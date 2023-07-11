import { PartialType } from '@nestjs/swagger';
import { CreateTypeDatumDto } from './create-type-datum.dto';

export class UpdateTypeDatumDto extends PartialType(CreateTypeDatumDto) {}
