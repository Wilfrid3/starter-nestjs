import { PartialType } from '@nestjs/swagger';
import { CreatePlantDiseaseDto } from './create-plant-disease.dto';

export class UpdatePlantDiseaseDto extends PartialType(CreatePlantDiseaseDto) {}
