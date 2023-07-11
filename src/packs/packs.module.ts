import { Module } from '@nestjs/common';
import { PacksService } from './packs.service';
import { PacksController } from './packs.controller';
import { Pack, PackSchema } from './schemas/pack.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pack.name, schema: PackSchema }]),
    ServicesModule
  ],
  controllers: [PacksController],
  providers: [PacksService],
  exports: [PacksService]
})
export class PacksModule {}
