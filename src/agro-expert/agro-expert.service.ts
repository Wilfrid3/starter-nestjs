import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAgroExpertDto } from './dto/create-agro-expert.dto';
import { AddUserToAgroexpertDto } from './dto/add-user-to-agroexpert.dto';
import { UpdateAgroExpertDto } from './dto/update-agro-expert.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Agroexpert, AgroexpertDocument } from './schemas/agroexpert.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { ProfilService } from '../profil/profil.service';
import { SpecialitiesService } from '../specialities/specialities.service';

@Injectable()
export class AgroExpertService {
  constructor(
    @InjectModel(Agroexpert.name) private agroexpertModel: Model<AgroexpertDocument>,
    private readonly usersService: UsersService,
    private readonly profileService: ProfilService,
    private readonly specialitiesService: SpecialitiesService
  ) { }

  async create(createAgroExpertDto: CreateAgroExpertDto, file: Express.Multer.File) {
    if (file) {
      createAgroExpertDto['image'] = file.path.split("/")[1];
    }
    let specialities = [];
    specialities = JSON.parse(createAgroExpertDto.specialite);
    const agroexpert = new this.agroexpertModel(createAgroExpertDto);
    const userData = { name: createAgroExpertDto.name, phone: createAgroExpertDto.phone };
    const user = await this.usersService.createWithProfile(userData, "AgroExpert");
    agroexpert.user = user._id;
    agroexpert.specialite = specialities
    await agroexpert.save();

    return {
      status: "success",
      message: "Agroexpert successfully created.",
      data: agroexpert,
    }
  }

  async addUserToAgroExpert(id: string, addUserToAgroexpertDto: AddUserToAgroexpertDto) {
    const agroexpert = await this.findById(id);
    const profile = await this.profileService.findById(addUserToAgroexpertDto.profileId);
    const user = await this.usersService.findById(addUserToAgroexpertDto.userId);

    // checks whether an element is even
    const even = (el) => el.user.toString() === user._id.toString();

    if (agroexpert.usersAndProfiles.some(even)) {
      return {
        status: 'aborted',
        message: `${user.name} already added to agroexpert ${agroexpert.name}`,
        data: agroexpert,
      };
    }

    await this.agroexpertModel.findOneAndUpdate({ _id: id }, {
      $push: {
        usersAndProfiles: {
          user: user,
          profile: profile,
        },
      },
    })
      .then((result) => {
        console.log('result', result);
      }).catch((error) => {
        console.log('add user to agroexpert error', error);
      });

    const newAgroexpert = await this.findById(id);

    return {
      status: 'success',
      message: `User: ${user.name} successfully added to Agroexpert: ${newAgroexpert.name}`,
      data: newAgroexpert,
    };
  }

  async findAll() {
    const agroexperts = await this.agroexpertModel.find().populate({
      path: 'user',
      populate: {
        path: 'plannings',
        populate: {
          path: 'ranges',
          populate: {
            path: 'day'
          },
        }
      }
    }).populate(['sheets', 'gallery', 'specialite'])
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: agroexperts,
    }
  }

  async findById(id: string) {
    const agroexpert = await this.agroexpertModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getAgroexpertById error', err)
      });

    if (!agroexpert) {
      throw new HttpException('Agroexpert Not found 56', HttpStatus.NOT_FOUND);
    }

    return agroexpert;
  }

  async findOne(id: string) {
    const agroexpert = await this.agroexpertModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new HttpException('Agroexpert Not found', HttpStatus.NOT_FOUND);
      });

    if (!agroexpert) {
      throw new HttpException('Agroexpert Not found', HttpStatus.NOT_FOUND);
    }

    return {
      status: 'success',
      data: agroexpert,
    }
  }

  async findByUser(id: string) {
    const expert = await this.agroexpertModel.find({ 'user': { $in: id } })
      .populate(['specialite', 'gallery', 'sheets'])
      .populate({
        path: 'appointments',
        populate: {
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
        },
      })
      .populate({
        path: 'appointments',
        populate: {
          path: 'service'
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
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: expert,
    }
  }

  async update(id: string, updateAgroExpertDto: UpdateAgroExpertDto, file: Express.Multer.File) {
    if (file) {
      updateAgroExpertDto['image'] = file.path.split("/")[1];
    }
    const agroexpert = await this.findById(id)
    if (!agroexpert) {
      throw new HttpException('agroexpert Not found', HttpStatus.NOT_FOUND);
    }
    await this.agroexpertModel.findOneAndUpdate({ _id: id }, {
      $set: { ...updateAgroExpertDto }
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        console.error('update agroexpert error', error)
        return error;
      })


    const updateExpert = await this.findById(id)
    if (updateAgroExpertDto.specialite) {
      let specialities = [];
      specialities = JSON.parse(updateAgroExpertDto.specialite);
      updateExpert.specialite = specialities
      updateExpert.save();
    }


    const newAgroexpert = await this.findById(id)

    return {
      status: 'success',
      message: `Agroexpert ${newAgroexpert.name} successfully updated.`,
      data: newAgroexpert,
    }
  }

  async remove(id: string) {
    const agroexpert = await this.findById(id)
    if (!agroexpert) {
      throw new HttpException('Agroexpert Not found', HttpStatus.NOT_FOUND);
    }
    await this.agroexpertModel.findOneAndDelete({ _id: id })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: 'success',
      message: "Agroexpert successfully deleted.",
    }
  }
}
