import { PartialType } from '@nestjs/mapped-types';
import { CreateDataEquipmentDto } from './create-data-equipment.dto';

export class UpdateDataEquipmentDto extends PartialType(CreateDataEquipmentDto) {}
