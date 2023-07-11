import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Order } from 'src/order/schemas/order.schema';
import { User } from 'src/schemas/user.schema';

export type PackageDocument = Package & Document;

@Schema({
  timestamps: true,
})

export class Package {

  @Prop()
  name: string

  @Prop()
  ref: string

  @Prop()
  endDate: Date

  @Prop()
  startDate: Date

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Order' })
  orders: Order[]
}

export const PackageSchema = SchemaFactory.createForClass(Package);