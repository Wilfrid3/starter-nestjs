import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Destination } from 'src/destination/schemas/destination.schema';
import { User } from 'src/schemas/user.schema';
import { TypeVehicle } from 'src/typevehicle/schemas/typevehicle.schema';

export type CostDocument = Cost & Document;

@Schema({
  timestamps: true,
})
export class Cost {
  @Prop()
  price: number;

  @Prop()
  type: number;

  @Prop()
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Destination' })
  destination: Destination

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'TypeVehicle' })
  typeVehicle: TypeVehicle
}

export const CostSchema = SchemaFactory.createForClass(Cost);
