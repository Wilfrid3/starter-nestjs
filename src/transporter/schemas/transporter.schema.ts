import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../schemas/user.schema';
import { Profil } from '../../profil/schema/profil.schema';
import { Specialities } from '../../specialities/schemas/specialities.schema';
import { Sheet } from '../../sheet/schemas/sheet.schema';

export type TransporterDocument = Transporter & Document;

@Schema({
  timestamps: true,
})
export class Transporter {
  @Prop()
  name: string;

  @Prop()
  idcard: string;

  @Prop()
  age: string;
 
  @Prop()
  address: string;

  @Prop()
  licence: string;

  //Numéro de téléphone
  @Prop()
  phone: string;

  @Prop()
  licenceDate: string;

  @Prop()
  imagecard: string;

  @Prop()
  image: string;

  @Prop()
  cardrecto: string;

  @Prop()
  cardverso: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  agency: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const TransporterSchema = SchemaFactory.createForClass(Transporter);