import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../schemas/user.schema';
import { Order } from '../../order/schemas/order.schema';
import { Appointment } from '../../appointment/schemas/appointment.schema';
import { Subscription } from 'src/subscription/schemas/subscription.schema';
import { Documents } from 'src/documents/schemas/document.schema';

export type TransactionDocument = Transaction & Document;

@Schema({
  timestamps: true,
})
export class Transaction {
  @Prop()
  ref: string;

  @Prop()
  libelle: string;

  @Prop()
  amount: Number;

  @Prop()
  status: Number;

  @Prop()
  type: Number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Order' })
  order: Order
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);