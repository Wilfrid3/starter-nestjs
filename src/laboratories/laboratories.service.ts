import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLaboratoryDto } from './dto/create-laboratory.dto';
import { AddUserToLaboratoryDto } from './dto/add-user-to-laboratory.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateLaboratoryDto } from './dto/update-laboratory.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Laboratory, LaboratoryDocument } from './schemas/laboratory.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { ProfilService } from '../profil/profil.service';
import { SpecialitiesService } from '../specialities/specialities.service';

@Injectable()
export class LaboratoriesService {
  constructor(
    @InjectModel(Laboratory.name) private laboratoryModel: Model<LaboratoryDocument>,
    private readonly usersService: UsersService,
    private readonly profileService: ProfilService,
    private readonly specialitiesService: SpecialitiesService
  ) { }

  async create(createLaboratoryDto: CreateLaboratoryDto, file: Express.Multer.File) {

    if (file) {
      createLaboratoryDto['image'] = file.path.split("/")[1];
    }

    let specialities = [];
    specialities = JSON.parse(createLaboratoryDto.specialite);
    const laboratory = new this.laboratoryModel(createLaboratoryDto);
    const userData = { name: createLaboratoryDto.name, phone: createLaboratoryDto.phone };
    const user = await this.usersService.createWithProfile(userData, "Laboratory");
    laboratory.user = user._id;
    laboratory.specialite = specialities
    await laboratory.save();

    return {
      status: "success",
      message: "Laboratory successfully created.",
      data: laboratory,
    }
  }

  async addUserToLaboratory(id: string, addUserToLaboratoryDto: AddUserToLaboratoryDto) {
    const laboratory = await this.findById(id);
    const profile = await this.profileService.findById(addUserToLaboratoryDto.profileId);
    const user = await this.usersService.findById(addUserToLaboratoryDto.userId);

    // checks whether an element is even
    const even = (el) => el.user.toString() === user._id.toString();

    if (laboratory.usersAndProfiles.some(even)) {
      return {
        status: 'aborted',
        message: `${user.name} already added to laboratory ${laboratory.name}`,
        data: laboratory,
      };
    }

    await this.laboratoryModel.findOneAndUpdate({ _id: id }, {
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
        console.log('add user to laboratory error', error);
      });

    const newLaboratory = await this.findById(id);

    return {
      status: 'success',
      message: `User: ${user.name} successfully added to Laboratory: ${newLaboratory.name}`,
      data: newLaboratory,
    };
  }

  async findAll() {
    const laboratories = await this.laboratoryModel.find().populate({
      path: 'user',
      populate: {
        path: 'plannings',
        populate: {
          path: 'ranges',
          populate: {
            path: 'day'
          },
        }
      },

    }).populate(['sheets', 'gallery', 'specialite'])
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: laboratories,
    }
  }

  async findByUser(id: string) {
    const laboratory = await this.laboratoryModel.find({ 'user': { $in: id } })
      .populate(['specialite', 'gallery', 'sheets'])
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
          path: 'service'
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
      data: laboratory,
    }
  }

  async findById(id: string) {
    const laboratory = await this.laboratoryModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getLaboratoryById error', err)
      });

    if (!laboratory) {
      throw new HttpException('Laboratory Not found 56', HttpStatus.NOT_FOUND);
    }

    return laboratory;
  }

  async findOne(id: string) {
    const laboratory = await this.laboratoryModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new HttpException('Laboratory Not found', HttpStatus.NOT_FOUND);
      });

    if (!laboratory) {
      throw new HttpException('Laboratory Not found', HttpStatus.NOT_FOUND);
    }

    return {
      status: 'success',
      data: laboratory,
    }
  }

  async update(id: string, updateLaboratoryDto: UpdateLaboratoryDto, file: Express.Multer.File) {
    // const specialities = JSON.parse();
    // delete updateLaboratoryDto.specialite;

    // updateLaboratoryDto.specialite = JSON.parse(updateLaboratoryDto.specialite);

    if (file) {
      updateLaboratoryDto['image'] = file.path.split("/")[1];
    }
    const laboratory = await this.findById(id)
    if (!laboratory) {
      throw new HttpException('Laboratory Not found', HttpStatus.NOT_FOUND);
    }
    await this.laboratoryModel.findOneAndUpdate({ _id: id }, {
      $set: { ...updateLaboratoryDto }
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        console.error('update laboratory error', error)
        return error;
      })


    const updateLabo = await this.findById(id)
    if (updateLaboratoryDto.specialite) {
      let specialities = [];
      specialities = JSON.parse(updateLaboratoryDto.specialite);
      updateLabo.specialite = specialities;
      updateLabo.save();
    }


    const newLaboratory = await this.findById(id)

    return {
      status: 'success',
      message: `Laboratory ${newLaboratory.name} successfully updated.`,
      data: newLaboratory,
    }
  }

  async remove(id: string) {
    const laboratory = await this.findById(id)
    if (!laboratory) {
      throw new HttpException('Laboratory Not found', HttpStatus.NOT_FOUND);
    }
    await this.laboratoryModel.findOneAndDelete({ _id: id })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: 'success',
      message: "Laboratory successfully deleted.",
    }
  }
}
