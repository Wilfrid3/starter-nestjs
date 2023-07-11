import { Module } from '@nestjs/common';
import { PlantDiseaseService } from './plant-disease.service';
import { PlantDiseaseController } from './plant-disease.controller';
import { PlantDisease, PlantDiseaseSchema } from './schemas/plant-disease.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PlantTypeModule } from 'src/plant-type/plant-type.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PlantDisease.name, schema: PlantDiseaseSchema }]),
    PlantTypeModule
  ],
  controllers: [PlantDiseaseController],
  providers: [PlantDiseaseService]
})
export class PlantDiseaseModule {}
