import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { PlantType } from '../../plant-type/schemas/planttype.schema';

export type PlantDiseaseDocument = PlantDisease & Document;

@Schema({
  timestamps: true,
})
export class PlantDisease {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  precaution: string;

  @Prop()
  image: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'PlantType' })
  plantType: PlantType
}

export const PlantDiseaseSchema = SchemaFactory.createForClass(PlantDisease);