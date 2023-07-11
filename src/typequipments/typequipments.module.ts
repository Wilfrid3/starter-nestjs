import { Module } from '@nestjs/common';
import { TypequipmentsService } from './typequipments.service';
import { TypequipmentsController } from './typequipments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Typequipment, TypequipmentSchema } from 'src/typequipments/schemas/typequipment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Typequipment.name, schema: TypequipmentSchema }]),
  ],
  controllers: [TypequipmentsController],
  providers: [TypequipmentsService],
  exports: [TypequipmentsService]
})
export class TypequipmentsModule {}
