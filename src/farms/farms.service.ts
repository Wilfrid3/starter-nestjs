import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Farm, FarmDocument } from '../schemas/farm.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { AddUserToFarmDto } from './dto/add-user-to-farm.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { RemoveUserFromFarmDto } from './dto/remove-user-from-farm.dto';
import { ProfilService } from '../profil/profil.service';
import { UpdateUserInFarmDto } from './dto/update-user-in-farm.dto';

@Injectable()
export class FarmsService {
  constructor(
    @InjectModel(Farm.name) private farmModel: Model<FarmDocument>,
    private readonly usersService: UsersService,
    private readonly profileService: ProfilService,
  ) {
  }

  async create(createFarmDto: CreateFarmDto) {
    const user = await this.usersService.findById(createFarmDto.ownerId);
    const profile = await this.profileService.findByName('Farmer owner');
    const farm = new this.farmModel(createFarmDto);
    farm.usersAndProfiles = [{
      user: user,
      profile: profile,
    }];
    await farm.save();

    return {
      status: 'success',
      message: 'Site successfully created.',
      data: farm,
    };
  }

  async findAll() {
    const farms = await this.farmModel.find().populate(['usersAndProfiles.user', 'usersAndProfiles.profile', 'devices']).exec()
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      });
    return {
      status: 'success',
      data: farms,
    };
  }

  async findById(id: string) {
    const farm = await this.farmModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getFarmById error', err);
      });

    if (!farm) {
      throw new HttpException('Site Not found', HttpStatus.NOT_FOUND);
    }

    return farm;
  }

  async findOne(id: string) {
    const farm = await this.farmModel.findById(id).populate(['usersAndProfiles.user', 'usersAndProfiles.profile', 'devices']).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('FindOne farm error', err);
      });

    if (!farm) {
      throw new HttpException('Site Not found', HttpStatus.NOT_FOUND);
    }

    return {
      status: 'success',
      data: farm,
    };
  }


  async findUserFarms(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new HttpException('User Not found', HttpStatus.NOT_FOUND);
    }

    const farms = await this.farmModel.find({ 'usersAndProfiles.user': { $in: userId } }).populate(['usersAndProfiles.user', 'usersAndProfiles.profile', 'devices']).exec();

    if (!farms) {
      throw new HttpException('Farm Not found', HttpStatus.NOT_FOUND);
    }

    return {
      status: 'success',
      data: farms,
    };
  }


  async findList(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new HttpException('User Not found', HttpStatus.NOT_FOUND);
    }

    const farms = await this.farmModel.find({ 'usersAndProfiles.user': { $in: userId } }).populate(['usersAndProfiles.user', 'usersAndProfiles.profile', 'devices']).exec();

    if (!farms) {
      throw new HttpException('Site Not found', HttpStatus.NOT_FOUND);
    }

    let res = [];
    if(farms.length > 0){
      await Promise.all(farms.map(async (elem) => {
        res.push({label: elem.name, value: elem._id});
      }));
    }

    return {
      status: 'success',
      data: res,
    };
  }

  async findFarmUsers(id: string) {
    const farm = await this.farmModel.findById(id).populate(['usersAndProfiles.user', 'usersAndProfiles.profile', 'devices']).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('FindOne farm error', err);
      });

    if (!farm) {
      throw new HttpException('Site Not found', HttpStatus.NOT_FOUND);
    }

    return {
      status: 'success',
      data: farm.usersAndProfiles,
    };
  }

  async update(id: string, updateFarmDto: UpdateFarmDto) {
    const farm = await this.findById(id);
    if (!farm) {
      throw new HttpException('Site Not found', HttpStatus.NOT_FOUND);
    }
    await this.farmModel.findOneAndUpdate({ _id: id }, {
      $set: { ...updateFarmDto },
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        console.error('update farm error', error);
        return error;
      });

    const newFarm = await this.findById(id);

    return {
      status: 'success',
      message: `Site ${newFarm.name} successfully updated.`,
      data: newFarm,
    };
  }

  async addUserToFarm(id: string, createUserDto: CreateUserDto, addUserToFarmDto: AddUserToFarmDto) {
    const farm = await this.findById(id);
    const profile = await this.profileService.findByName("Farmer monitor");
    const user = await this.usersService.addNewUser(createUserDto);

    // checks whether an element is even
    const even = (el) => el.user.toString() === user._id.toString();

    if (farm.usersAndProfiles.some(even)) {
      return {
        status: 'aborted',
        message: `${user.name} already added to farm ${farm.name}`,
        data: farm,
      };
    }

    await this.farmModel.findOneAndUpdate({ _id: id }, {
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
        console.log('add user to farm error', error);
      });

    const newFarm = await this.findById(id);

    return {
      status: 'success',
      message: `User: ${user.name} successfully added to farm: ${newFarm.name}`,
      data: newFarm,
    };
  }

  async updateUserInFarm(farmId: string, userId: string, dto: UpdateUserInFarmDto) {
    const farm = await this.findById(farmId);
    await this.profileService.findById(dto.profileId);
    const user = await this.usersService.findById(userId);
    
    // checks whether an element is even
    const even = (el) => el.user.toString() === user._id.toString();

    if (farm.usersAndProfiles.some(even)) {
      const newUsersAndProfiles = farm.usersAndProfiles.map(obj => {
        if (obj.user.toString() === user._id.toString()) {
          return {...obj, profile: dto.profileId};
        }
        return obj;
      });
      console.log('newUsersAndProfiles', newUsersAndProfiles);

      await this.farmModel.updateOne({ _id: farm._id}, {
        $set: {
          usersAndProfiles: newUsersAndProfiles,
        },
      })
        .then((result) => {
          console.log('result', result);
        }).catch((error) => {
          console.log('update user in farm error', error);
        });

      const newFarm = await this.findById(farmId);

      return {
        status: 'success',
        message: `User: ${user.name} successfully updated in Site: ${newFarm.name}`,
        data: newFarm,
      };
    }

    return {
      status: 'aborted',
      message: `${user.name} not in the Site ${farm.name}`,
      data: farm,
    };
  }

  async removeUserFromFarm(id: string, removeUserFromFarmDto: RemoveUserFromFarmDto) {
    const farm = await this.findById(id);
    const user = await this.usersService.findById(removeUserFromFarmDto.userId);

    // checks whether an element is even
    const even = (el) => el.user.toString() === user._id.toString();

    if (farm.usersAndProfiles.some(even)) {
      const farm = await this.farmModel.findByIdAndUpdate(id, {
        $pull: { usersAndProfiles: { user: user } },
      })
        .then((result) => {
          return result;
        }).catch((error) => {
          console.error('remove user from farm error', error);
          return error;
        });

      const newFarm = await this.findById(id);

      return {
        status: 'success',
        message: `User ${user.name} successfully removed from Site ${farm.name}`,
        data: newFarm,
      };
    }

    return {
      message: `User ${user.name} is not in the Site ${farm.name}`,
      status: 'aborted',
    };

  }

  async remove(id: string) {
    const farm = await this.findById(id);

    await this.farmModel.findOneAndDelete({ _id: farm._id })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      });

    return {
      status: 'success',
      message: 'Site successfully deleted.',
    };
  }
}
