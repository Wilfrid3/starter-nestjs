import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Destination } from 'src/destination/schemas/destination.schema';
import { User } from 'src/schemas/user.schema';
import { TypeVehicle } from 'src/typevehicle/schemas/typevehicle.schema';
import { Unity } from 'src/unity/schemas/unity.schema';

export type VehicleDocument = Vehicle & Document;

@Schema({
  timestamps: true,
})
export class Vehicle {
  @Prop()
  image: string;
  
  @Prop()
  image1: string;
  
  @Prop()
  image2: string;

  @Prop()
  image3: string;

  @Prop()
  image4: string;

  @Prop()
  name: string;

  @Prop()
  marque: string;

  @Prop()
  model: string;

  @Prop()
  capacity: number;

  @Prop()
  year: string;

  @Prop()
  immatriculation: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'TypeVehicle' })
  typevehicle: TypeVehicle

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Unity' })
  unity: Unity
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
