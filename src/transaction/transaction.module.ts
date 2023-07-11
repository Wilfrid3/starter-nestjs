import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from '../transaction/schemas/transaction.schema';
import { UsersModule } from '../users/users.module';
import { OrderModule } from '../order/order.module';
import { AppointmentModule } from '../appointment/appointment.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]),
    UsersModule,
    OrderModule,
    AppointmentModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService]
})
export class TransactionModule {}
