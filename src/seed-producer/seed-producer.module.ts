import { Module } from '@nestjs/common';
import { SeedProducerService } from './seed-producer.service';
import { SeedProducerController } from './seed-producer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedProducer, SeedProducerSchema } from './schemas/seedproducer.schema';
import { UsersModule } from '../users/users.module';
import { ProfilModule } from '../profil/profil.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SeedProducer.name, schema: SeedProducerSchema }]),
    UsersModule,
    ProfilModule,
  ],
  controllers: [SeedProducerController],
  providers: [SeedProducerService],
  exports: [SeedProducerService]
})
export class SeedProducerModule {}
