import { Module } from '@nestjs/common';
import { TypePostService } from './type-post.service';
import { TypePostController } from './type-post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Typepost, TypepostSchema } from './schemas/Typepost.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Typepost.name, schema: TypepostSchema }]),
  ],
  controllers: [TypePostController],
  providers: [TypePostService],
  exports: [TypePostService]
})
export class TypePostModule {}
