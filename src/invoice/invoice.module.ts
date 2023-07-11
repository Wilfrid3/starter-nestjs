import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Invoice, InvoiceSchema } from './schemas/invoice.schema';
import { OrderModule } from 'src/order/order.module';
import { UsersModule } from 'src/users/users.module';
import { HttpModule } from '@nestjs/axios';
import { VehicleModule } from 'src/vehicle/vehicle.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Invoice.name, schema: InvoiceSchema }]),
    OrderModule,
    UsersModule,
    VehicleModule,
    HttpModule
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService],
  exports: [InvoiceService]
})
export class InvoiceModule {}
