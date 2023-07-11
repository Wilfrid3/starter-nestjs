import { Module } from '@nestjs/common';
import { MainCategoryService } from './main-category.service';
import { MainCategoryController } from './main-category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MainCategory, MainCategorySchema } from './schemas/main-category.schema';
// import { CategoryModule } from '../category/category.module';
import { ProfilModule } from '../profil/profil.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MainCategory.name, schema: MainCategorySchema }]),
    ProfilModule,
  ],
  controllers: [MainCategoryController],
  providers: [MainCategoryService],
  exports: [MainCategoryService]
})
export class MainCategoryModule {}
