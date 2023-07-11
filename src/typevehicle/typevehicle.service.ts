import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTypevehicleDto } from './dto/create-typevehicle.dto';
import { UpdateTypevehicleDto } from './dto/update-typevehicle.dto';
import { TypeVehicle, TypeVehicleDocument } from './schemas/typevehicle.schema';

@Injectable()
export class TypevehicleService {

  constructor(@InjectModel(TypeVehicle.name) private typevehicleModel: Model<TypeVehicleDocument>) { }

  async create(createTypevehicleDto: CreateTypevehicleDto, file: Express.Multer.File) {
    try {
      if (file) {
        createTypevehicleDto['image'] = file.path.split("\\")[2];
      }
      const type = await this.findByname(createTypevehicleDto.name);
      if (type !== null) {
        const newTypeVehicle = new this.typevehicleModel(createTypevehicleDto);
        await newTypeVehicle.save();

        return {
          status: "success",
          message: "Type successfully created.",
          data: newTypeVehicle,
        }
      }

      return {
        status: "false",
        message: "Type already exist.",
        data: type,
      }
    } catch (error) {
      return {
        status: "false",
        message: error,
        data: null,
      }
    }
  }

  async findByname(name: string) {
    const typevehicle = await this.typevehicleModel.find({ name: name }).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getTypeVehicleById error', err)
      });

    if (!typevehicle) {
      return null;
    }

    return typevehicle;
  }

  async findById(id: string) {
    const typevehicle = await this.typevehicleModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getTypeDataById error', err)
      });

    if (!typevehicle) {
      throw new HttpException('Type Data Not found 56', HttpStatus.NOT_FOUND);
    }

    return typevehicle;
  }

  async findAll() {
    const typeVehicles = await this.typevehicleModel.find().exec()
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      });
    let res = [];
    if (typeVehicles.length > 0) {
      await Promise.all(typeVehicles.map(async (elem) => {
        res.push({ label: elem.name, value: elem._id, icon: elem.image });
      }));
    }

    return {
      status: 'success',
      data: res,
    };
  }

  async findOne(id: string) {
    const typevehicle = await this.typevehicleModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getTypeVehicleById error', err)
      });

    if (!typevehicle) {
      throw new HttpException('Type Vehicle Not found 56', HttpStatus.NOT_FOUND);
    }

    return typevehicle;
  }

  async update(id: string, updateTypevehicleDto: UpdateTypevehicleDto) {
    try {
      const updateType = await this.typevehicleModel.findByIdAndUpdate(id, {
        $set: { ...updateTypevehicleDto },
      });

      const type = await this.findById(id);
      return {
        status: "success",
        message: "Type successfully updated.",
        data: type,
      }
    } catch (error) {
      return {
        status: "false",
        message: error,
        data: null,
      }
    }
  }

  async remove(id: string) {
    return await this.typevehicleModel.findByIdAndDelete(id);
  }
}
