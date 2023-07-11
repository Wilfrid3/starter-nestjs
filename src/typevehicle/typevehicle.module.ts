import { Module } from '@nestjs/common';
import { TypevehicleService } from './typevehicle.service';
import { TypevehicleController } from './typevehicle.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeVehicle, TypeVehicleSchema } from './schemas/typevehicle.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TypeVehicle.name, schema: TypeVehicleSchema }]),
  ],
  controllers: [TypevehicleController],
  providers: [TypevehicleService],
  exports: [TypevehicleService]
})
export class TypevehicleModule {}
