import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTypePostDto } from './dto/create-type-post.dto';
import { UpdateTypePostDto } from './dto/update-type-post.dto';
import { Typepost, TypepostDocument } from './schemas/Typepost.schema';

@Injectable()
export class TypePostService {

  constructor(@InjectModel(Typepost.name) private typepostModel: Model<TypepostDocument>) { }

  async create(createTypePostDto: CreateTypePostDto) {
    try {
      const newTypepost = new this.typepostModel(createTypePostDto);
      await newTypepost.save();
      return newTypepost;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    const typePosts = await this.typepostModel.find().exec()
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      });
      let res = [];
      if(typePosts.length > 0){
        await Promise.all(typePosts.map(async (elem) => {
          res.push({label: elem.name, value: elem._id});
        }));
      }

    return {
      status: 'success',
      data: res,
    };
  }

  async findById(id: string) {
    const typepost = await this.typepostModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getTypepostById error', err)
      });

    if(!typepost){
      throw new HttpException('Type Post Not found 56', HttpStatus.NOT_FOUND);
    }

    return typepost;
  }

  async findOne(id: string) {
    const typepost = await this.typepostModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getTypepostById error', err)
      });

    if(!typepost){
      throw new HttpException('Type Post Not found 56', HttpStatus.NOT_FOUND);
    }

    return typepost;
  }

  async update(id: string, updateTypePostDto: UpdateTypePostDto) {
    try {
      const updateType = await this.typepostModel.findByIdAndUpdate(id, {
        $set: { ...updateTypePostDto },
      });
      return updateType;
    } catch (error) {
      return error;
    }
  }

  async remove(id: string) {
    return await this.typepostModel.findByIdAndDelete(id);
  }
}
