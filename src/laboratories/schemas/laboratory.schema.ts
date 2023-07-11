import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../schemas/user.schema';
import { Profil } from '../../profil/schema/profil.schema';
import { Appointment } from 'src/appointment/schemas/appointment.schema';
import { Specialities } from '../../specialities/schemas/specialities.schema';
import { Gallery } from '../../gallery/schemas/gallery.schema';
import { Sheet } from '../../sheet/schemas/sheet.schema';

export type LaboratoryDocument = Laboratory & Document;

@Schema({
  timestamps: true,
})
export class Laboratory {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  city: string;

  @Prop()
  country: string;

  @Prop()
  agreement: string;

  @Prop()
  numcontrib: string;

  @Prop()
  image: string;

  @Prop()
  price: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Specialities' }])
  specialite: Specialities[]

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Sheet' }])
  sheets: Sheet[]

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Gallery' }])
  gallery: Gallery

  @Prop([{
    type: {user:{type: MongooseSchema.Types.ObjectId, ref: 'User'}, profile:{type: MongooseSchema.Types.ObjectId, ref: 'Profil'}}
  }])
  usersAndProfiles: [{user: User | string, profile: Profil | string }]

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Appointment' }])
  appointments: Appointment[]
}

export const LaboratorySchema = SchemaFactory.createForClass(Laboratory);