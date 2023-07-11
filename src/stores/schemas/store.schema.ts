import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../schemas/user.schema';
import { Product } from '../../products/schemas/product.schema';
import { Order } from '../../order/schemas/order.schema';
import { Delivery } from 'src/delivery/schemas/delivery.schema';

export type StoreDocument = Store & Document;

@Schema({
  timestamps: true,
})
export class Store {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  city: string;

  @Prop({default: 0})
  price_livraison: number;

  @Prop()
  country: string;

  @Prop()
  image: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Product' }])
  products: Product[]

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Order' }])
  orders: Order[]

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Delivery' }])
  deliveries: Delivery[]
}

export const StoreSchema = SchemaFactory.createForClass(Store);