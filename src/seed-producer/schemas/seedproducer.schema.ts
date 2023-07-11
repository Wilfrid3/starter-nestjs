import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../schemas/user.schema';
import { Profil } from '../../profil/schema/profil.schema';
import { Specialities } from '../../specialities/schemas/specialities.schema';
import { Sheet } from '../../sheet/schemas/sheet.schema';

export type SeedProducerDocument = SeedProducer & Document;

@Schema({
  timestamps: true,
})
export class SeedProducer {
  @Prop()
  name: string;

  @Prop()
  description: string;

  //Niveau académique
  @Prop()
  level: string;
 
  //Coordonnées geographique
  @Prop()
  longitude: string;
 
  //Coordonnées geographique
  @Prop()
  latitude: string;

  @Prop()
  email: string;

  //Numéro de téléphone
  @Prop()
  phone: string;

  @Prop()
  city: string;

  @Prop()
  country: string;

  @Prop()
  image: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Sheet' }])
  sheets: Sheet[]
}

export const SeedProducerSchema = SchemaFactory.createForClass(SeedProducer);