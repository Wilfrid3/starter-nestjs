import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PlantTypeService } from 'src/plant-type/plant-type.service';
import { CreatePlantDiseaseDto } from './dto/create-plant-disease.dto';
import { UpdatePlantDiseaseDto } from './dto/update-plant-disease.dto';
import { Model } from 'mongoose';
import { PlantDisease, PlantDiseaseDocument } from './schemas/plant-disease.schema';

@Injectable()
export class PlantDiseaseService {

  constructor(
    @InjectModel(PlantDisease.name) private plantdiseaseModel: Model<PlantDiseaseDocument>,
    private readonly plantTypeService: PlantTypeService
  ) {}

  async create(createPlantDiseaseDto: CreatePlantDiseaseDto, file: Express.Multer.File) {
    if(!file){
      return {
        status: "error",
        message: "Image is required.",
        data: null,
      }
    }
    createPlantDiseaseDto['image'] = file.path.split("/")[1];
    const plantype = await this.plantTypeService.findById(createPlantDiseaseDto.plantType);
    const plantdisease = new this.plantdiseaseModel(createPlantDiseaseDto)
    plantdisease.plantType = plantype._id
    await plantdisease.save();

    return {
      status: "success",
      message: "Plant Disease successfully created.",
      data: plantdisease,
    }
  }

  async findAll() {
    const plantdiseases = await this.plantdiseaseModel.find().populate('plantType').exec()
      .then((result) =>{
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: plantdiseases,
    }
  }

  async findOne(id: string) {
    const plantdisease = await this.plantdiseaseModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getPlantDiseaseById error', err)
      });

    if(!plantdisease){
      throw new HttpException('Plant Disease Not found 56', HttpStatus.NOT_FOUND);
    }

    return plantdisease;
  }

  async update(id: string, updatePlantDiseaseDto: UpdatePlantDiseaseDto, file: Express.Multer.File) {
    if(file){
      updatePlantDiseaseDto['image'] = file.path.split("/")[1];
    }
    const plantdisease = await this.findOne(id)
    if(!plantdisease){
      throw new HttpException('Plant Disease Not found', HttpStatus.NOT_FOUND);
    }
    await this.plantdiseaseModel.findOneAndUpdate({_id: id}, {
      $set: { ...updatePlantDiseaseDto }
    })
      .then((result) =>{
        return result;
      }).catch((error) => {
        console.error('update Plant Disease error', error)
        return error;
      })

    const newPlantDisease = await this.findOne(id)

    return {
      status: 'success',
      message: `Plant Disease ${newPlantDisease.name} successfully updated.`,
      data: newPlantDisease,
    }
  }

  remove(id: string) {
    return `This action removes a #${id} plantDisease`;
  }
}
