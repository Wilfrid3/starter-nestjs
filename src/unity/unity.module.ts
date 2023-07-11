import { Module } from '@nestjs/common';
import { UnityService } from './unity.service';
import { UnityController } from './unity.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Unity, UnitySchema } from './schemas/unity.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Unity.name, schema: UnitySchema }]),
    UsersModule,
  ],
  controllers: [UnityController],
  providers: [UnityService],
  exports: [UnityService]
})
export class UnityModule {}
