import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Delivery } from 'src/delivery/schemas/delivery.schema';
import { User } from '../../schemas/user.schema';

export type AddressDocument = Address & Document;

@Schema({
  timestamps: true,
})
export class Address {

  @Prop()
  quarter: string;

  @Prop()
  location: string;

  @Prop()
  phone: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User
}

export const AddressSchema = SchemaFactory.createForClass(Address);
