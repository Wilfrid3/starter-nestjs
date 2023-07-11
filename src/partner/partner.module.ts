import { Module } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { PartnerController } from './partner.controller';
import { Partner, PartnerSchema } from './schemas/partner.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Partner.name, schema: PartnerSchema }])
  ],
  controllers: [PartnerController],
  providers: [PartnerService],
  exports: [PartnerService]
})
export class PartnerModule {}
