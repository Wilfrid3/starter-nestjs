import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../schemas/user.schema';
import { Subscription } from './subscription.schema';

export type BillingDocument = Billing & Document;

@Schema({
  timestamps: true,
})
export class Billing {

  @Prop()
  initialcredit: number;

  @Prop()
  rest: number;

  @Prop()
  credit: number;

  @Prop()
  type: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Subscription' })
  subscription: Subscription
}

export const BillingSchema = SchemaFactory.createForClass(Billing);