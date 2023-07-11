import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDiseaseDto } from './dto/create-disease.dto';
import { UpdateDiseaseDto } from './dto/update-disease.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Disease, DiseaseDocument } from './schemas/diseases.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';

@Injectable()
export class DiseasesService {

  constructor(
    @InjectModel(Disease.name) private diseaseModel: Model<DiseaseDocument>,
    private readonly usersService: UsersService
  ) {}

  async create(createDiseaseDto: CreateDiseaseDto, file: Express.Multer.File) {
    
    if(!file){
      return {
        status: "error",
        message: "Image is required.",
        data: null,
      }
    }
    createDiseaseDto['image'] = file.path.split("/")[1];
    console.log('file', file);
    console.log('dto', createDiseaseDto);
    const user = await this.usersService.findById(createDiseaseDto.userId);
    const disease = new this.diseaseModel(createDiseaseDto)
    disease.user = [user._id]
    await disease.save();

    return {
      status: "success",
      message: "Disease successfully created.",
      data: disease,
    }
  }

  async findById(id: string) {
    const disease = await this.diseaseModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getDiseaseById error', err)
      });

    if(!disease){
      throw new HttpException('Disease Not found 56', HttpStatus.NOT_FOUND);
    }

    return disease;
  }

  async findAll() {
    const diseases = await this.diseaseModel.find().populate('user').exec()
      .then((result) =>{
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: diseases,
    }
  }

  async findByUser(id: string) {
    const diseases = await this.diseaseModel.find({ 'user': { $in: id } }).sort({ 'createdAt': -1 }).exec()
      .then((result) =>{
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: diseases,
    }
  }

  async update(id: string, updateDiseaseDto: UpdateDiseaseDto, file: Express.Multer.File) {
    if(file){
      updateDiseaseDto['image'] = file.path.split("\\")[1];
    }
    const disease = await this.findById(id)
    if(!disease){
      throw new HttpException('Disease Not found', HttpStatus.NOT_FOUND);
    }
    await this.diseaseModel.findOneAndUpdate({_id: id}, {
      $set: { ...updateDiseaseDto }
    })
      .then((result) =>{
        return result;
      }).catch((error) => {
        console.error('update Disease error', error)
        return error;
      })

    const newDisease = await this.findById(id)

    return {
      status: 'success',
      message: `Disease ${newDisease.name} successfully updated.`,
      data: newDisease,
    }
  }

  async remove(id: string) {
    const disease = await this.findById(id)
    if(!disease){
      throw new HttpException('Disease Not found', HttpStatus.NOT_FOUND);
    }
    await this.diseaseModel.findOneAndDelete({_id: id})
      .then((result) =>{
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: 'success',
      message: "Disease successfully deleted.",
    }
  }
}
