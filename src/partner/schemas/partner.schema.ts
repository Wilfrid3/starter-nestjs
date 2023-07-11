import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../schemas/user.schema';
import { Profil } from '../../profil/schema/profil.schema';
import { Appointment } from 'src/appointment/schemas/appointment.schema';
import { Specialities } from '../../specialities/schemas/specialities.schema';
import { Gallery } from '../../gallery/schemas/gallery.schema';
import { Sheet } from '../../sheet/schemas/sheet.schema';

export type PartnerDocument = Partner & Document;

@Schema({
  timestamps: true,
})
export class Partner {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  region: string;

  @Prop()
  postalcode: string;

  @Prop()
  companyname: string;

  @Prop()
  about: string;

  @Prop()
  website: string;

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
  speciality: string;
}

export const PartnerSchema = SchemaFactory.createForClass(Partner);