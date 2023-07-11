import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Package, PackageDocument } from './schemas/package.schema';

@Injectable()
export class PackageService {

  constructor(
    @InjectModel(Package.name) private packageModel: Model<PackageDocument>,
    private readonly userService: UsersService
  ) { }

  async create(createPackageDto: CreatePackageDto) {
    const user = await this.userService.findById(createPackageDto.userId);
    const packag = new this.packageModel(createPackageDto);
    packag.user = user._id;
    await packag.save();

    return {
      status: "success",
      message: "Package successfully created.",
      data: packag,
    }
  }

  async findAll() {
    const packages = await this.packageModel.find().exec()
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: packages,
    }
  }

  async findOne(id: string) {
    const pack = await this.packageModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getPackageById error', err)
      });

    if (!pack) {
      throw new HttpException('Pack Not found 56', HttpStatus.NOT_FOUND);
    }

    return pack;
  }

  async findByUser(id: string) {
    const packages = await this.packageModel.find({ 'user': { $in: id } }).sort({ 'createdAt': -1 }).populate(['user', 'orders'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getPackagesByUser error', err)
      });

    return {
      status: "success",
      data: packages,
    }
  }

  async update(id: string, updatePackageDto: UpdatePackageDto) {
    const pack = await this.findOne(id)
    if (!pack) {
      throw new HttpException('Package Not found', HttpStatus.NOT_FOUND);
    }
    await this.packageModel.findOneAndUpdate({ _id: id }, {
      $set: { ...updatePackageDto }
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        console.error('update Pack error', error)
        return error;
      })

    const newPack = await this.findOne(id)

    return {
      status: 'success',
      message: `Package ${newPack.name} successfully updated.`,
      data: newPack,
    }
  }

  remove(id: number) {
    return `This action removes a #${id} package`;
  }
}
