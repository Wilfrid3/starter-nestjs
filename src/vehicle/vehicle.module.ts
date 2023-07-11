import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { UsersModule } from 'src/users/users.module';
import { TypevehicleModule } from 'src/typevehicle/typevehicle.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UnityModule } from 'src/unity/unity.module';
import { Vehicle, VehicleSchema } from './schemas/vehicle.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vehicle.name, schema: VehicleSchema }]),
    UsersModule,
    TypevehicleModule,
    UnityModule
  ],
  controllers: [VehicleController],
  providers: [VehicleService],
  exports: [VehicleService]
})
export class VehicleModule {}
