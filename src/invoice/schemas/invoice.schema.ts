import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../schemas/user.schema';
import { Order } from '../../order/schemas/order.schema';
import { Vehicle } from 'src/vehicle/schemas/vehicle.schema';

export type InvoiceDocument = Invoice & Document;

@Schema({
  timestamps: true,
})
export class Invoice {
  @Prop()
  ref: string;

  @Prop({default: 1})
  status: Number;

  @Prop({default: 0})
  price: Number;

  @Prop()
  message: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vehicle' })
  vehicle: Vehicle

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Order' })
  order: Order
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);