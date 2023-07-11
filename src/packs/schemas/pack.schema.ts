import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Service } from 'src/schemas/service.schema';
import { NumberContext } from 'twilio/lib/rest/pricing/v2/voice/number';

export type PackDocument = Pack & Document;

@Schema({
  timestamps: true,
})

export class Pack {

  @Prop()
  libelle: string

  @Prop()
  description: string

  @Prop({default: 0})
  credit: number

  @Prop()
  period: string

  @Prop()
  numberPeriod: number

  @Prop({default: 1})
  status: number

  @Prop({default: 0})
  price: number

  @Prop({default: 0})
  free: number
}

export const PackSchema = SchemaFactory.createForClass(Pack);