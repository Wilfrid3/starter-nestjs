import { Module } from '@nestjs/common';
import { SheetService } from './sheet.service';
import { SheetController } from './sheet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Sheet, SheetSchema } from './schemas/sheet.schema';
import { LaboratoriesModule } from '../laboratories/laboratories.module';
import { AgroExpertModule } from '../agro-expert/agro-expert.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sheet.name, schema: SheetSchema }]),
    LaboratoriesModule,
    AgroExpertModule,
  ],
  controllers: [SheetController],
  providers: [SheetService],
  exports: [SheetService]
})
export class SheetModule {}
