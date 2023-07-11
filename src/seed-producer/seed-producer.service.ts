import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSeedProducerDto } from './dto/create-seed-producer.dto';
import { UpdateSeedProducerDto } from './dto/update-seed-producer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SeedProducer, SeedProducerDocument } from './schemas/seedproducer.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { ProfilService } from '../profil/profil.service';

@Injectable()
export class SeedProducerService {
  constructor(
    @InjectModel(SeedProducer.name) private seedproducerModel: Model<SeedProducerDocument>,
    private readonly usersService: UsersService,
    private readonly profileService: ProfilService
  ) {}

  async create(createSeedProducerDto: CreateSeedProducerDto, file: Express.Multer.File) {
    if(file){
      createSeedProducerDto['image'] = file.path.split("/")[1];
    }
    const seedproducer = new this.seedproducerModel(createSeedProducerDto);
    const userData = {name: createSeedProducerDto.name, phone: createSeedProducerDto.phone};
    const user = await this.usersService.createWithProfile(userData, "SeedProducer");
    seedproducer.user = user._id;
    await seedproducer.save();

    return {
      status: "success",
      message: "Seed Producer successfully created.",
      data: seedproducer,
    }
  }

  async findAll() {
    const seedproducers = await this.seedproducerModel.find().populate({
      path: 'user',
      populate: { 
        path: 'stores',
      }
    })
      .then((result) =>{
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: seedproducers,
    }
  }

  async findById(id: string) {
    const seedproducer = await this.seedproducerModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getSeedProducerById error', err)
      });

    if(!seedproducer){
      throw new HttpException('SeedProducer Not found 56', HttpStatus.NOT_FOUND);
    }

    return seedproducer;
  }

  async findOne(id: string) {
    const seedproducer = await this.seedproducerModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new HttpException('SeedProducer Not found', HttpStatus.NOT_FOUND);
      });

    if(!seedproducer){
      throw new HttpException('SeedProducer Not found', HttpStatus.NOT_FOUND);
    }

    return {
      status: 'success',
      data: seedproducer,
    }
  }

  async findByUser(id: string) {
    const seeproducer = await this.seedproducerModel.find({ 'user': { $in: id } })
    .populate(['gallery', 'sheets'])
    .populate({
      path: 'appointments',
      populate: {
          path: 'user',
      },
    })
    .populate({
      path: 'appointments',
      populate: {
          path: 'laboratory',
          populate: {
            path: 'user'
          }
      },
    })
    .populate({
      path: 'appointments',
      populate: {
          path: 'range',
          populate: {
            path: 'day',
          }
      },
    })
    .populate({
        path: 'user',
        populate: {
          path: 'plannings',
          populate: {
            path: 'ranges',
            populate: {
              path: 'day',
            }
          }
        },
    })
      .then((result) =>{
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: seeproducer,
    }
  }

  async update(id: string, updateSeedProducerDto: UpdateSeedProducerDto, file: Express.Multer.File) {
    if(file){
      updateSeedProducerDto['image'] = file.path.split("/")[1];
    }
    const seedproducer = await this.findById(id)
    if(!seedproducer){
      throw new HttpException('SeedProducer Not found', HttpStatus.NOT_FOUND);
    }
    const updateProducer = await this.seedproducerModel.findOneAndUpdate({_id: id}, {
      $set: { ...updateSeedProducerDto }
    })
      .then((result) =>{
        return result;
      }).catch((error) => {
        console.error('update agroexpert error', error)
        return error;
      })

    const newSeedProducer = await this.findById(id)

    return {
      status: 'success',
      message: `Seed Producer ${newSeedProducer.name} successfully updated.`,
      data: newSeedProducer,
    }
  }

  async remove(id: string) {
    const seedproducer = await this.findById(id)
    if(!seedproducer){
      throw new HttpException('Seed Producer Not found', HttpStatus.NOT_FOUND);
    }
    await this.seedproducerModel.findOneAndDelete({_id: id})
      .then((result) =>{
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: 'success',
      message: "Seed Producer successfully deleted.",
    }
  }
}
