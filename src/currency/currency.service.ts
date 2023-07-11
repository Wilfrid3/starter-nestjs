import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Currency, CurrencyDocument } from './schemas/currency.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectModel(Currency.name) private currencyModel: Model<CurrencyDocument>,
    private readonly usersService: UsersService
  ) {}

  async create(createCurrencyDto: CreateCurrencyDto) {
    const user = await this.usersService.findById(createCurrencyDto.userId);
    const currency = new this.currencyModel(createCurrencyDto)
    currency.user = [user._id]
    await currency.save();

    return {
      status: "success",
      message: "Currency successfully created.",
      data: currency,
    }
  }

  async findAll() {
    const currencies = await this.currencyModel.find().populate(['user', 'products'])
      .then((result) =>{
        return result;
      }).catch((error) => {
        return error;
      })

      let res = [];
      if(currencies.length > 0){
        await Promise.all(currencies.map(async (elem) => {
          res.push({label: elem.name, value: elem._id});
        }));
      }
    return {
      status: "success",
      data: res,
    }
  }

  async findById(id: string) {
    const currency = await this.currencyModel.findById(id).populate(['user', 'products'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getCurrencyById error', err)
      });

    if(!currency){
      throw new HttpException('Currency Not found 56', HttpStatus.NOT_FOUND);
    }

    return currency;
  }

  findOne(id: string) {
    return `This action returns a #${id} currency`;
  }

  async update(id: string, updateCurrencyDto: UpdateCurrencyDto) {
    const currency = await this.findById(id)
    if(!currency){
      throw new HttpException('Currency Not found', HttpStatus.NOT_FOUND);
    }
    await this.currencyModel.findOneAndUpdate({_id: id}, {
      $set: { ...updateCurrencyDto }
    })
      .then((result) =>{
        return result;
      }).catch((error) => {
        console.error('update currency error', error)
        return error;
      })

    const newCurrency = await this.findById(id)

    return {
      status: 'success',
      message: `Currency ${newCurrency.name} successfully updated.`,
      data: newCurrency,
    }
  }

  async remove(id: string) {
    const currency = await this.findById(id)
    if(!currency){
      throw new HttpException('Currency Not found', HttpStatus.NOT_FOUND);
    }
    await this.currencyModel.findOneAndDelete({_id: id})
      .then((result) =>{
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: 'success',
      message: "Currency successfully deleted.",
    }
  }
}
