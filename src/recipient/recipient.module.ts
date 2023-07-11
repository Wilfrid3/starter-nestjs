import { Module } from '@nestjs/common';
import { RecipientService } from './recipient.service';
import { RecipientController } from './recipient.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Recipient, RecipientSchema } from './schemas/recipient.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipient.name, schema: RecipientSchema }]),
  ],
  controllers: [RecipientController],
  providers: [RecipientService],
  exports: [RecipientService]
})
export class RecipientModule {}
