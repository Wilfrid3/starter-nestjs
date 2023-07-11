import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ServicesService } from 'src/services/services.service';
import { CreatePackDto } from './dto/create-pack.dto';
import { UpdatePackDto } from './dto/update-pack.dto';
import { Pack, PackDocument } from './schemas/pack.schema';
import { Model } from 'mongoose';

@Injectable()
export class PacksService {

  constructor(
    @InjectModel(Pack.name) private packModel: Model<PackDocument>,
    private readonly serviceService: ServicesService
  ) { }

  async create(createPackDto: CreatePackDto) {
    const pack = new this.packModel(createPackDto);
    await pack.save();

    return {
      status: "success",
      message: "Pack successfully created.",
      data: pack,
    }
  }

  async findAll() {
    const packs = await this.packModel.find().exec()
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: packs,
    }
  }

  async findById(id: string) {
    const pack = await this.packModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getPackById error', err)
      });

    if (!pack) {
      throw new HttpException('Pack Not found 56', HttpStatus.NOT_FOUND);
    }

    return pack;
  }

  findOne(id: number) {
    return `This action returns a #${id} pack`;
  }

  async update(id: string, updatePackDto: UpdatePackDto) {
    const pack = await this.findById(id)
    if (!pack) {
      throw new HttpException('Pack Not found', HttpStatus.NOT_FOUND);
    }
    await this.packModel.findOneAndUpdate({ _id: id }, {
      $set: { ...updatePackDto }
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        console.error('update Pack error', error)
        return error;
      })

    const newPack = await this.findById(id)

    return {
      status: 'success',
      message: `Pack ${newPack.libelle} successfully updated.`,
      data: newPack,
    }
  }

  async remove(id: string) {
    const pack = await this.findById(id)
    if (!pack) {
      throw new HttpException('Pack Not found', HttpStatus.NOT_FOUND);
    }
    await this.packModel.findOneAndDelete({ _id: id })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: 'success',
      message: "Pack successfully deleted.",
    }
  }
}
