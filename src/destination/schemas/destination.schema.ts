import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DestinationDocument = Destination & Document;

@Schema({
  timestamps: true,
})
export class Destination {
  @Prop()
  depart: string;

  @Prop()
  departCoord: string;

  @Prop()
  arrival: string;

  @Prop()
  arrivalCoord: string;
}

export const DestinationSchema = SchemaFactory.createForClass(Destination);
