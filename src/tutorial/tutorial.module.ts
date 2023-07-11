import { Module } from '@nestjs/common';
import { TutorialService } from './tutorial.service';
import { TutorialController } from './tutorial.controller';
import { TypePostModule } from 'src/type-post/type-post.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Tutorial, TutorialSchema } from './schemas/Tutorial.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tutorial.name, schema: TutorialSchema }]),
    TypePostModule,
  ],
  controllers: [TutorialController],
  providers: [TutorialService],
  exports: [TutorialService]
})
export class TutorialModule {}
