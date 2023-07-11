import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { UsersModule } from '../users/users.module';
import { CategoryModule } from '../category/category.module';
import { UnityModule } from '../unity/unity.module';
import { CurrencyModule } from '../currency/currency.module';
import { StoresModule } from '../stores/stores.module';
import { RecipientModule } from 'src/recipient/recipient.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    UsersModule,
    CategoryModule,
    UnityModule,
    CurrencyModule,
    StoresModule,
    RecipientModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}
