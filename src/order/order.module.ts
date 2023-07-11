import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { ItemOrder, ItemOrderSchema } from './schemas/item-order.schema';
import { Transaction, TransactionSchema } from '../transaction/schemas/transaction.schema';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { StoresModule } from '../stores/stores.module';
import { AddressModule } from '../address/address.module';
import { CostModule } from 'src/cost/cost.module';
import { VehicleModule } from 'src/vehicle/vehicle.module';
import { ServicesModule } from 'src/services/services.module';
import { TypevehicleModule } from 'src/typevehicle/typevehicle.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }, { name: ItemOrder.name, schema: ItemOrderSchema }, { name: Transaction.name, schema: TransactionSchema }]),
    UsersModule,
    ServicesModule,
    TypevehicleModule,
    HttpModule
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService]
})
export class OrderModule {}
