import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';
import { Profil } from '../profil/schema/profil.schema';
import { Equipment } from '../equipments/schemas/equipment.schema';

export type FarmDocument = Farm & Document;

@Schema({
  timestamps: true,
})
export class Farm {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  city: string;

  @Prop()
  location: string;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Equipment' }])
  devices: Equipment[]

  @Prop([{
    type: {user:{type: MongooseSchema.Types.ObjectId, ref: 'User'}, profile:{type: MongooseSchema.Types.ObjectId, ref: 'Profil'}}
  }])
  usersAndProfiles: [{user: User | string, profile: Profil | string }]
}

export const FarmSchema = SchemaFactory.createForClass(Farm);