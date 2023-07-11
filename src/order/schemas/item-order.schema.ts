import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Product } from '../../products/schemas/product.schema';
import { Order } from './order.schema';
import { User } from '../../schemas/user.schema';

export type ItemOrderDocument = ItemOrder & Document;

@Schema({
  timestamps: true,
})

export class ItemOrder {

  @Prop()
  price: number

  @Prop({default: 1})
  quantity: number

  @Prop({default: 0})
  weight: number

  @Prop()
  name: string

  @Prop()
  image: string

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Order' })
  order: Order
}

export const ItemOrderSchema = SchemaFactory.createForClass(ItemOrder);