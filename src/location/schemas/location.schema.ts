import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../schemas/user.schema';
import { Order } from '../../order/schemas/order.schema';
import { Vehicle } from 'src/vehicle/schemas/vehicle.schema';

export type LocationDocument = Location & Document;

@Schema({
  timestamps: true,
})
export class Location {
  @Prop()
  longitude: string;

  @Prop()
  latitude: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Order' })
  order: Order
}

export const LocationSchema = SchemaFactory.createForClass(Location);