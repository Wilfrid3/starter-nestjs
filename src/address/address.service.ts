import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Address, AddressDocument } from './schemas/address.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<AddressDocument>,
    private readonly usersService: UsersService
  ) { }

  async create(createAddressDto: CreateAddressDto) {
    const user = await this.usersService.findById(createAddressDto.ownerId);
    const address = new this.addressModel(createAddressDto)
    address.user = user._id
    await address.save();

    return {
      status: "success",
      message: "Address successfully created.",
      data: address,
    }
  }

  async findAll() {
    const addresses = await this.addressModel.find().exec()
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: addresses,
    }
  }

  async findByUser(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new HttpException('User Not found', HttpStatus.NOT_FOUND);
    }

    const address = await this.addressModel.find({ 'user': { $in: userId } }).exec().then((result) => {
      return result;
    })
      .catch((err) => {
        console.log('getAddressById error', err)
      });

    if (!address) {
      throw new HttpException('Address Not found', HttpStatus.NOT_FOUND);
    }

    return {
      status: 'success',
      data: address,
    };
  }

  async findById(id: string) {
    const address = await this.addressModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getAddressById error', err)
      });

    if (!address) {
      throw new HttpException('Address Not found 56', HttpStatus.NOT_FOUND);
    }

    return address;
  }

  findOne(id: string) {
    return `This action returns a #${id} address`;
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    const address = await this.findById(id)
    if (!address) {
      throw new HttpException('Address Not found', HttpStatus.NOT_FOUND);
    }
    await this.addressModel.findOneAndUpdate({ _id: id }, {
      $set: { ...updateAddressDto }
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        console.error('update address error', error)
        return error;
      })

    const newAddress = await this.findById(id)

    return {
      status: 'success',
      message: `Address ${newAddress.quarter} successfully updated.`,
      data: newAddress,
    }
  }

  async remove(id: string) {
    const address = await this.findById(id)
    if (!address) {
      throw new HttpException('Address Not found', HttpStatus.NOT_FOUND);
    }
    await this.addressModel.findOneAndDelete({ _id: id })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: 'success',
      message: "Address successfully deleted.",
    }
  }
}
