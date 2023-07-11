import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Subscription, SubscriptionSchema } from './schemas/subscription.schema';
import { Transaction, TransactionSchema } from 'src/transaction/schemas/transaction.schema';
import { PacksModule } from 'src/packs/packs.module';
import { Billing, BillingSchema } from './schemas/billing.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Subscription.name, schema: SubscriptionSchema }, { name: Transaction.name, schema: TransactionSchema }, { name: Billing.name, schema: BillingSchema }]),
    UsersModule,
    PacksModule
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService]
})
export class SubscriptionModule {}
