import { PartialType } from '@nestjs/mapped-types';
import { CreateTypequipmentDto } from './create-typequipment.dto';

export class UpdateTypequipmentDto extends PartialType(CreateTypequipmentDto) {}
