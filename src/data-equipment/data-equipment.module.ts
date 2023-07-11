import { Module } from '@nestjs/common';
import { DataEquipmentService } from './data-equipment.service';
import { DataEquipmentController } from './data-equipment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Data, DataSchema } from './schemas/data.schema';
import { SensorModule } from '../sensor/sensor.module';
import { UsersModule } from 'src/users/users.module';
import { EquipmentsModule } from 'src/equipments/equipments.module';
import { Sensor, SensorSchema } from 'src/sensor/schemas/sensor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Data.name, schema: DataSchema }, {name: Sensor.name, schema: SensorSchema}]),
    SensorModule,
    UsersModule,
    EquipmentsModule
  ],
  controllers: [DataEquipmentController],
  providers: [DataEquipmentService],
  exports: [DataEquipmentService]
})
export class DataEquipmentModule {}
