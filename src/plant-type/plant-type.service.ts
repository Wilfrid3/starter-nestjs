import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlantTypeDto } from './dto/create-plant-type.dto';
import { UpdatePlantTypeDto } from './dto/update-plant-type.dto';
import { PlantTypeDocument, PlantType } from './schemas/planttype.schema';

@Injectable()
export class PlantTypeService {
  
  constructor(@InjectModel(PlantType.name) private planttypeModel: Model<PlantTypeDocument>) { }

  async create(createPlantTypeDto: CreatePlantTypeDto) {
    const plantType = new this.planttypeModel(createPlantTypeDto)
    await plantType.save();

    return {
      status: "success",
      message: "plantType successfully created.",
      data: plantType,
    }
  }

  async findAll() {
    const plantypes = await this.planttypeModel.find().exec()
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      });
      let res = [];
      if(plantypes.length > 0){
        await Promise.all(plantypes.map(async (elem) => {
          res.push({label: elem.name, value: elem.name});
        }));
      }

    return {
      status: 'success',
      data: res,
    };
  }

  async findById(id: string) {
    const planttype = await this.planttypeModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getplanttypeById error', err)
      });

    if (!planttype) {
      throw new HttpException('planttype Not found 56', HttpStatus.NOT_FOUND);
    }

    return planttype;
  }

  async findOne(id: string) {
    const planttype = await this.planttypeModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getplanttypeById error', err)
      });

    if (!planttype) {
      throw new HttpException('planttype Not found 56', HttpStatus.NOT_FOUND);
    }

    return planttype;
  }

  async update(id: string, updatePlantTypeDto: UpdatePlantTypeDto) {
    const plantype = await this.findById(id)
    if (!plantype) {
      throw new HttpException('Plant Type Not found', HttpStatus.NOT_FOUND);
    }
    await this.planttypeModel.findOneAndUpdate({ _id: id }, {
      $set: { ...updatePlantTypeDto }
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        console.error('update Plant Type error', error)
        return error;
      })

    const newPlanttype = await this.findById(id)

    return {
      status: 'success',
      message: `Plant Type ${newPlanttype.name} successfully updated.`,
      data: newPlanttype,
    }
  }

  async remove(id: string) {
    const plantType = await this.findById(id)
    if (!plantType) {
      throw new HttpException('plantType Not found', HttpStatus.NOT_FOUND);
    }
    await this.planttypeModel.findOneAndDelete({ _id: id })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: 'success',
      message: "Plant Type successfully deleted.",
    }
  }
}
