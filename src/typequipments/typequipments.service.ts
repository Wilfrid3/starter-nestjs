import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTypequipmentDto } from './dto/create-typequipment.dto';
import { UpdateTypequipmentDto } from './dto/update-typequipment.dto';
import { TypequipmentDocument, Typequipment } from './schemas/typequipment.schema';

@Injectable()
export class TypequipmentsService {
  
  constructor(@InjectModel(Typequipment.name) private typequipmentModel: Model<TypequipmentDocument>) { }

  async create(createTypequipmentDto: CreateTypequipmentDto) {
    try {
      const newTypequipment = new this.typequipmentModel(createTypequipmentDto);
      await newTypequipment.save();
      return newTypequipment;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    const typeEquips = await this.typequipmentModel.find().exec()
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      });
      let res = [];
      if(typeEquips.length > 0){
        await Promise.all(typeEquips.map(async (elem) => {
          res.push({label: elem.name, value: elem._id});
        }));
      }

    return {
      status: 'success',
      data: res,
    };
  }

  async findById(id: string) {
    const typequipment = await this.typequipmentModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getTypequipmentById error', err)
      });

    if(!typequipment){
      throw new HttpException('Type Equipment Not found 56', HttpStatus.NOT_FOUND);
    }

    return typequipment;
  }

  async findOne(id: string) {
    const type = await this.typequipmentModel.findById(id).exec()
    .then((result)=>{
      return result;
    })
    .catch((error)=>{
      console.log("FIND ONE TYPE EQUIPMENT ERROR : ",error);
    });
    return type;
  }

  async update(id: string, updateTypequipmentDto: UpdateTypequipmentDto) {
    try {
      const updateType = await this.typequipmentModel.findByIdAndUpdate(id, {
        $set: { ...updateTypequipmentDto },
      });
      return updateType;
    } catch (error) {
      return error;
    }
  }

  async remove(id: string) {
    return await this.typequipmentModel.findByIdAndDelete(id);
  }
}
