import { Module } from '@nestjs/common';
import { PlantTypeService } from './plant-type.service';
import { PlantTypeController } from './plant-type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PlantType, PlantTypeSchema } from 'src/plant-type/schemas/planttype.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PlantType.name, schema: PlantTypeSchema }]),
  ],
  controllers: [PlantTypeController],
  providers: [PlantTypeService],
  exports: [PlantTypeService]
})
export class PlantTypeModule {}
