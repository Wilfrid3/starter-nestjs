import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../schemas/user.schema';
import { Profil } from '../../profil/schema/profil.schema';
import { Specialities } from '../../specialities/schemas/specialities.schema';
import { Sheet } from '../../sheet/schemas/sheet.schema';
import { Gallery } from '../../gallery/schemas/gallery.schema';
import { Appointment } from '../../appointment/schemas/appointment.schema';

export type AgroexpertDocument = Agroexpert & Document;

@Schema({
  timestamps: true,
})
export class Agroexpert {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  longitude: string;

  @Prop()
  latitude: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  city: string;

  @Prop()
  price: string;

  @Prop()
  level: string;

  @Prop()
  country: string;

  @Prop()
  image: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Specialities' }])
  specialite: Specialities[]

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Sheet' }])
  sheets: Sheet[]

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Gallery' }])
  gallery: Gallery[]

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Appointment' }])
  appointments: Appointment[]

  @Prop([{
    type: {user:{type: MongooseSchema.Types.ObjectId, ref: 'User'}, profile:{type: MongooseSchema.Types.ObjectId, ref: 'Profil'}}
  }])
  usersAndProfiles: [{user: User | string, profile: Profil | string }]
}

export const AgroexpertSchema = SchemaFactory.createForClass(Agroexpert);