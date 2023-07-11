import { Module } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { SensorController } from './sensor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Sensor, SensorSchema } from 'src/sensor/schemas/sensor.schema';
import { EquipmentsModule } from '../equipments/equipments.module';
import { TypeDataModule } from '../type-data/type-data.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sensor.name, schema: SensorSchema }]),
    EquipmentsModule,
    TypeDataModule
  ],
  controllers: [SensorController],
  providers: [SensorService],
  exports: [SensorService]
})
export class SensorModule {}
