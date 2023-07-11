import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../schemas/user.schema';
import { Product } from '../../products/schemas/product.schema';

export type CurrencyDocument = Currency & Document;

@Schema({
  timestamps: true,
})
export class Currency {
  @Prop({ unique: true })
  @Prop()
  name: string;

  @Prop({ unique: true })
  @Prop()
  code: string;

  @Prop()
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User[]

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Product' }])
  products: Product[]
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);
