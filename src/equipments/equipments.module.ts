import { Module } from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { EquipmentsController } from './equipments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Equipment, EquipmentSchema } from 'src/equipments/schemas/equipment.schema';
import { FarmsModule } from '../farms/farms.module';
import { TypequipmentsModule } from '../typequipments/typequipments.module';
import { Sensor, SensorSchema } from 'src/sensor/schemas/sensor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Equipment.name, schema: EquipmentSchema }, { name: Sensor.name, schema: SensorSchema }]),
    FarmsModule,
    TypequipmentsModule
  ],
  controllers: [EquipmentsController],
  providers: [EquipmentsService],
  exports: [EquipmentsService],
})
export class EquipmentsModule {}
