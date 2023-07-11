import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../schemas/user.schema';
import { Category } from '../../category/schemas/category.schema';
import { Unity } from '../../unity/schemas/unity.schema';
import { Currency } from '../../currency/schemas/currency.schema';
import { Store } from '../../stores/schemas/store.schema';
import { Recipient } from 'src/recipient/schemas/recipient.schema';

export type ProductDocument = Product & Document;

@Schema({
  timestamps: true,
})
export class Product {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: string;

  @Prop()
  image: string;

  @Prop()
  image1: string;

  @Prop()
  image2: string;

  @Prop()
  image3: string;

  @Prop()
  minQte: string;

  @Prop()
  totalQte: string;

  @Prop()
  cycle: string;

  @Prop()
  yield: string;

  @Prop()
  place: string;

  @Prop()
  rate_germination: string;

  @Prop()
  color: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Store' })
  store: Store

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category' })
  category: Category

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Unity' })
  unity: Unity

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Currency' })
  currency: Currency

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Recipient' })
  recipient: Recipient
}

export const ProductSchema = SchemaFactory.createForClass(Product);
