import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Documents, DocumentsSchema } from './schemas/document.schema';
import { UsersModule } from 'src/users/users.module';
import { SheetModule } from 'src/sheet/sheet.module';
import { Transaction, TransactionSchema } from 'src/transaction/schemas/transaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Documents.name, schema: DocumentsSchema }, { name: Transaction.name, schema: TransactionSchema }]),
    UsersModule,
    SheetModule,
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService],
  exports: [DocumentsService]
})
export class DocumentsModule {}
