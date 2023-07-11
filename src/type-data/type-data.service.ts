import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateTypeDatumDto } from './dto/create-type-datum.dto';
import { UpdateTypeDatumDto } from './dto/update-type-datum.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TypeDataDocument, TypeData } from './schemas/type-data.schema';

@Injectable()
export class TypeDataService {
  
  constructor(@InjectModel(TypeData.name) private typedataModel: Model<TypeDataDocument>) { }

  async create(createTypeDatumDto: CreateTypeDatumDto) {
    try {
      const type = await this.findByname(createTypeDatumDto.name);
      if(type !== null){
        const newTypeData = new this.typedataModel(createTypeDatumDto);
        await newTypeData.save();
        return newTypeData;
      }
      return type;
    } catch (error) {
      return error;
    }
  }

  async findByname(name: string) {
    const typedata = await this.typedataModel.find({name: name}).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getTypeDataById error', err)
      });

    if(!typedata){
      return null;
    }

    return typedata;
  }

  async findById(id: string) {
    const typedata = await this.typedataModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getTypeDataById error', err)
      });

    if(!typedata){
      throw new HttpException('Type Data Not found 56', HttpStatus.NOT_FOUND);
    }

    return typedata;
  }

  async findAll() {
    const typeDatas = await this.typedataModel.find().exec()
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      });
      let res = [];
      if(typeDatas.length > 0){
        await Promise.all(typeDatas.map(async (elem) => {
          res.push({label: elem.name, value: elem._id});
        }));
      }

    return {
      status: 'success',
      data: res,
    };
  }

  async findOne(id: string) {
    const type = await this.typedataModel.findById(id).exec()
    .then((result)=>{
      return result;
    })
    .catch((error)=>{
      console.log("FIND ONE TYPE DATA ERROR : ",error);
    });
    return type;
  }

  async update(id: string, updateTypeDatumDto: UpdateTypeDatumDto) {
    try {
      const updateType = await this.typedataModel.findByIdAndUpdate(id, {
        $set: { ...updateTypeDatumDto },
      });
      return updateType;
    } catch (error) {
      return error;
    }
  }

  async remove(id: string) {
    return await this.typedataModel.findByIdAndDelete(id);
  }
}
