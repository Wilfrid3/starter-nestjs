import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUnityDto } from './dto/create-unity.dto';
import { UpdateUnityDto } from './dto/update-unity.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Unity, UnityDocument } from './schemas/unity.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';

@Injectable()
export class UnityService {
  constructor(
    @InjectModel(Unity.name) private unityModel: Model<UnityDocument>,
    private readonly usersService: UsersService
  ) { }

  async create(createUnityDto: CreateUnityDto) {
    const unity = new this.unityModel(createUnityDto)
    if (createUnityDto.userId) {
      const user = await this.usersService.findById(createUnityDto.userId);
      unity.user = [user._id]
    }
    await unity.save();

    return {
      status: "success",
      message: "Unity successfully created.",
      data: unity,
    }
  }

  async findAll() {
    const unities = await this.unityModel.find().populate(['user', 'products'])
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })
    let res = [];
    if (unities.length > 0) {
      await Promise.all(unities.map(async (elem) => {
        res.push({ label: elem.name, value: elem._id });
      }));
    }
    return {
      status: "success",
      data: res,
    }
  }

  async findById(id: string) {
    const unity = await this.unityModel.findById(id).populate(['user', 'products'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getUnityById error', err)
      });

    if (!unity) {
      throw new HttpException('Unity Not found 56', HttpStatus.NOT_FOUND);
    }

    return unity;
  }

  findOne(id: string) {
    return `This action returns a #${id} unity`;
  }

  async update(id: string, updateUnityDto: UpdateUnityDto) {
    const unity = await this.findById(id)
    if (!unity) {
      throw new HttpException('Unity Not found', HttpStatus.NOT_FOUND);
    }
    await this.unityModel.findOneAndUpdate({ _id: id }, {
      $set: { ...updateUnityDto }
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        console.error('update unity error', error)
        return error;
      })

    const newUnity = await this.findById(id)

    return {
      status: 'success',
      message: `Unity ${newUnity.name} successfully updated.`,
      data: newUnity,
    }
  }

  async remove(id: string) {
    const unity = await this.findById(id)
    if (!unity) {
      throw new HttpException('Unity Not found', HttpStatus.NOT_FOUND);
    }
    await this.unityModel.findOneAndDelete({ _id: id })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: 'success',
      message: "Unity successfully deleted.",
    }
  }
}
