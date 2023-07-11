import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Specialities, SpecialitiesDocument } from './schemas/specialities.schema';
import { Model } from 'mongoose';

@Injectable()
export class SpecialitiesService {
  constructor(
    @InjectModel(Specialities.name) private specialitiesModel: Model<SpecialitiesDocument>
  ) {}

  async create(createSpecialityDto: CreateSpecialityDto) {
    const speciality = new this.specialitiesModel(createSpecialityDto)
    await speciality.save();

    return {
      status: "success",
      message: "Speciality successfully created.",
      data: speciality,
    }
  }

  async findAll() {
    const specialities = await this.specialitiesModel.find()
      .then((result) =>{
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: specialities,
    }
  }

  async findById(id: string) {
    const speciality = await this.specialitiesModel.findById(id)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getSpecialityById error', err)
      });

    if(!speciality){
      throw new HttpException('Speciality Not found 56', HttpStatus.NOT_FOUND);
    }

    return speciality;
  }

  findOne(id: number) {
    return `This action returns a #${id} speciality`;
  }

  async update(id: string, updateSpecialityDto: UpdateSpecialityDto) {
    const speciality = await this.findById(id)
    if(!speciality){
      throw new HttpException('Speciality Not found', HttpStatus.NOT_FOUND);
    }
    await this.specialitiesModel.findOneAndUpdate({_id: id}, {
      $set: { ...updateSpecialityDto }
    })
      .then((result) =>{
        return result;
      }).catch((error) => {
        console.error('update speciality error', error)
        return error;
      })

    const newSpeciality = await this.findById(id)

    return {
      status: 'success',
      message: `Speciality ${newSpeciality.libelle} successfully updated.`,
      data: newSpeciality,
    }
  }

  async remove(id: string) {
    const speciality = await this.findById(id)
    if(!speciality){
      throw new HttpException('Speciality Not found', HttpStatus.NOT_FOUND);
    }
    await this.specialitiesModel.findOneAndDelete({_id: id})
      .then((result) =>{
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: 'success',
      message: "Speciality successfully deleted.",
    }
  }
}
