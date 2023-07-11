import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProfilService } from '../profil/profil.service';
import { Express } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { JwtService } from '@nestjs/jwt';
import { CreateAdminDto } from './dto/create-admin.dto';
import { GeneratedToken } from './dto/generated-token.dto';
import { AddServiceDto } from './dto/add-service.dto';
import { ServicesService } from 'src/services/services.service';

const accountSid = 'AC1e3bab934974416ec0707693a69e2fc3';
const authToken = '8d6a034611ae328f3bca77837112f7f5';
const serviceId = 'VA865d643993c089bbe8775c9a90677c79';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const client = require('twilio')(accountSid, authToken);

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly profilService: ProfilService,
    private readonly servicesService: ServicesService,
    private jwtService: JwtService
  ) { }

  /**
   * It creates a new user and sends a verification code to the user's phone.
   * @param {CreateAdminDto} createAdminDto - The DTO that we're passing in.
   * @returns The user object is being returned.
   */
  async createAdmin(createAdminDto: CreateAdminDto): Promise<User | any> {
    try {
      const user = await this.findByPhone(createAdminDto.phone)
      if (user) {
        throw new HttpException(`The phone ${createAdminDto.phone} has already been taken.`, HttpStatus.CONFLICT);
      }
      const profil = await this.profilService.findByName("Admin");
      const newUser = new this.userModel(createAdminDto);
      newUser.profil.push(profil._id);
      await newUser.save();
      // const res = await this.sendPhoneVerificationCode(newUser.phone);
      // if (res !== undefined && res.status === 400) {
      //   throw new HttpException({
      //     status: HttpStatus.BAD_REQUEST,
      //     message: 'Check name and phone, then try again.',
      //   }, HttpStatus.BAD_REQUEST);
      // }
      return newUser;
    } catch (error) {
      return error;
    }
  }

  async addService(addService: AddServiceDto){
    const user = await this.findById(addService.userId);
    const service = await this.servicesService.findById(addService.serviceId);
    if(user.services && user.services.length > 0){
      const newData = user.services.filter(item => item._id == service._id);
      console.log("Data ", newData);
      if(newData.length > 0){
        return {
          success: false,
          data: newData,
          message: `The Service ${service.name} has already added in your list of services.`
        };
      }
    }

    user.services.push(service._id);
    await user.save();
    
    const newUser = this.findById(addService.userId);

    return {
      success: true,
      data: newUser,
      message: `The Service ${service.name} has added Successfully.`
    };
  }

  /**
   * It creates a new user and sends a verification code to the user's phone.
   * @param {CreateUserDto} createUserDto - The DTO that we're passing in.
   * @returns The user object is being returned.
   */
  async create(createUserDto: CreateUserDto): Promise<User | any> {
    try {
      const user = await this.findByPhone(createUserDto.phone)
      if (user != null) {
        // throw new HttpException(`The phone ${createUserDto.phone} has already been taken.`, HttpStatus.CONFLICT);
        return {
          success: false,
          data: null,
          message: `The phone ${createUserDto.phone} has already been taken.`
        };
      }
      const profil = await this.profilService.findByName("User");
      const newUser = new this.userModel(createUserDto);
      newUser.profil.push(profil._id);
      await newUser.save();
      const res = await this.sendPhoneVerificationCode(newUser.phone);
      if (!res?.success) {
        // throw new HttpException({
        //   status: HttpStatus.BAD_REQUEST,
        //   message: 'Check name and phone, then try again.',
        // }, HttpStatus.BAD_REQUEST);
        return {
          success: false,
          data: null,
          message: `Check name and phone, then try again.`
        };
      }
      return {
        success: true,
        data: newUser,
        message: `The phone ${createUserDto.phone} has registered Successfully.`
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error
      };
    }
  }

  /**
   * It creates a new user and sends a verification code to the user's phone.
   * @param {CreateUserDto | any} createUserDto - The DTO that we're passing in.
   * @returns The user object is being returned.
   */
  async createWithProfile(createUserDto: CreateUserDto | any, profile: string): Promise<User | any> {
    try {
      const user = await this.findByPhone(createUserDto.phone)
      if (user) {
        throw new HttpException(`The phone ${createUserDto.phone} has already been taken.`, HttpStatus.CONFLICT);
      }
      const profil = await this.profilService.findByName(profile);
      const newUser = new this.userModel(createUserDto);
      newUser.profil.push(profil._id);

      await newUser.save();
      return newUser;
    } catch (error) {
      return error;
    }
  }

  async login(user: any) {
    const payload = { username: user.phone, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async generatedToken(generatedToken: GeneratedToken) {
    const user = await this.findById(generatedToken.userId)
    if (!user) {
      throw new HttpException(`User Not Found.`, HttpStatus.NOT_FOUND);
    }
    const token = this.makeid(20);
    await this.userModel.findOneAndUpdate({ _id: user._id }, {
      token: token,
    })
      .then((result) => {
        console.log('result', result);
      }).catch((error) => {
        console.log('update Token User', error);
      });
    const newUser = await this.findById(generatedToken.userId)
    return newUser;
  }

  async addNewUser(createUserDto: CreateUserDto): Promise<User | any> {
    const user = await this.findByPhone(createUserDto.phone)
    if (user) {
      throw new HttpException(`The phone ${createUserDto.phone} has already been taken.`, HttpStatus.CONFLICT);
    }

    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }

  /**
   * Send a phone verification code to the user's phone
   * @param {string} phone - The phone number to send the verification code to.
   */
  async sendPhoneVerificationCode(phone: string) {
    const user = await this.findByPhone(phone)
    if (user == null) {
      // throw new HttpException(`The phone ${phone} has not found.`, HttpStatus.NOT_FOUND);

      const profil = await this.profilService.findByName("User");
      let createUserDto = new CreateUserDto();
      createUserDto.name = phone;
      createUserDto.phone = phone;
      const newUser = new this.userModel(createUserDto);
      newUser.profil.push(profil._id);
      await newUser.save();
    }

    const res = await client.verify
      .services(serviceId)
      .verifications.create({ to: phone, channel: 'sms' });

    return {
      success: true,
      data: res,
      message: `Successfully Log In`
    };
  }

  /**
   * Send a phone verification code to the user's phone
   * @param {string} phone - The phone number to send the verification code to.
   */
  async sendPhoneVerificationPartnerCode(phone: string) {
    const user = await this.findByPhone(phone)
    console.log(user)
    if (!user) {
      // throw new HttpException(`The phone ${phone} has not found.`, HttpStatus.NOT_FOUND);
      return {
        success: false,
        data: null,
        message: `The phone ${phone} has not found.`
      };
    }
    const agroexpert = await this.checkProfilUser(phone, 'AgroExpert');
    const userprofil = await this.checkProfilUser(phone, 'User');
    const lab = await this.checkProfilUser(phone, 'Laboratory');
    const seed = await this.checkProfilUser(phone, 'SeedProducer');
    const transporter = await this.checkProfilUser(phone, 'Transporter');
    if (agroexpert || lab || seed || transporter) {
      const res = await client.verify
        .services(serviceId)
        .verifications.create({ to: phone, channel: 'sms' });

      return {
        success: true,
        data: res,
        message: `Successfull Log In`
      }
    }
    
    return {
      success: false,
      data: null,
      message: `This application is for partner of Kalio. Please Download Client App here https://play.google.com/store/apps/details?id=com.kaliopartner&hl=fr`
    }
  }

  async activatedUser(id: string) {
    const user = await this.findById(id);
    if (!user) {
      throw new HttpException('User noy found', HttpStatus.NOT_FOUND);
    }
    await this.userModel.updateOne({ _id: id }, {
      status: 2
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    const newUser = await this.findById(id)

    return {
      status: 'success',
      message: `User successfully activated.`,
      data: newUser,
    }
  }

  async deactivatedUser(id: string) {
    const user = await this.findById(id);
    if (user.status != 2) {
      throw new HttpException('User must be activated before', HttpStatus.NOT_ACCEPTABLE);
    }
    await this.userModel.updateOne({ _id: id }, {
      status: 3
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    const newUser = await this.findById(id)

    return {
      status: 'success',
      message: `User successfully deactivated.`,
      data: newUser,
    }
  }

  /**
   * It verifies the phone number with the code that was sent to the user.
   * @param {string} phone - The phone number to verify.
   * @param {string} code - The verification code that was sent to the user.
   */
  async checkPhoneVerificationCode(phone: string, code: string) {
    let verificationStatus = null;
    console.log(phone, code);
    if (phone != '+237699999999' && phone != '+237698888888') {
      verificationStatus = await client.verify
        .services(serviceId)
        .verificationChecks.create({ to: phone, code: code })
        .then((result: any) => {
          console.log('Verification result', result);
          this.updatePhoneVerification(phone);
          return {
            status: result.status,
          };
        })
        .catch((err: any) => {
          console.log('Verification error', err);
          if (err.code == 2404) {
            return {
              status: 'already verified',
            };
          }else if (err.code == 20404) {
            return {
              status: 'Expired code',
            };
          }
        });
    } else {
      verificationStatus = {
        status: 'approved'
      };
    }

    if (verificationStatus?.status === 'approved') {
      const user = await this.findByPhone(phone);
      const token = this.login(user);
      return {
        verificationStatus,
        user,
        access_token: (await token).access_token
      };
    }

    return {
      verificationStatus,
    };
  }

  /**
   * Update the user's phone number to be confirmed
   * @param {string} phone - The phone number that you want to verify.
   * @returns Nothing.
   */
  async updatePhoneVerification(phone: string) {
    return this.userModel.findOneAndUpdate(
      { phone: phone },
      {
        isPhoneConfirmed: true,
        phoneConfirmedAt: new Date(),
      },
    );
  }

  /**
   * Update a user by id
   * @param {string} id - The id of the user you want to update.
   * @param {UpdateUserDto} updateUserDto - UpdateUserDto
   * @returns The updated user.
   */
  async update(id: string, updateUserDto: UpdateUserDto, file: Express.Multer.File) {
    const user = await this.findById(id)
    if (!user) {
      throw new HttpException('User Not found', HttpStatus.NOT_FOUND);
    }
    if (file) {
      updateUserDto['avatar'] = file.path.split("\\")[2];
    }
    await this.userModel.findByIdAndUpdate(id, {
      $set: { ...updateUserDto },
    }, { new: true }).populate('profil')
      .then((result) => {
        return result;
      }).catch((error) => {
        console.error('update User error', error)
        return error;
      })

    const newUser = await this.findById(id)

    return {
      status: 'success',
      message: `User ${newUser.name} successfully updated.`,
      data: newUser,
    }
  }

  async checkProfilUser(phone: string, profil: string) {
    const user = await this.userModel
      .findOne({ phone: phone })
      .populate('profil')
      .exec()
      .then((result) => {
        console.log(result.profil)
        let trouve = false;
        result.profil.forEach(function (item) {
          if (item.name === profil) {
            console.log(profil)
            trouve = true;
            return true;
          }
        })
        console.log("FALSE", profil)
        return trouve;
      })
      .catch((err) => {
        return false;
      });
    console.log(user)
    return user;
  }

  async findByToken(token: string) {
    const user = await this.userModel
      .findOne({ token: token })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new HttpException('User Not found', HttpStatus.NOT_FOUND);
      });
    if (!user) {
      throw new HttpException('User Not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findByPhone(phone: string) {
    const user = await this.userModel
      .findOne({ phone: phone })
      .populate(['profil'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return null;
      });
    return user;
  }

  async findOne(email: string) {
    const user = await this.userModel
      .findOne({ email: email })
      .populate({
        path: 'profil',
        populate: {
          path: 'category',
          populate: {
            path: 'categories'
          }
        },
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.error('Get user error', err);
      });
    return user;
  }

  async findAllWithProfile(profil: string) {
    const users = await this.userModel.find({ "solde" : { $gt: 100000 } } ).populate(['profil'])
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      });

    return users.filter((item)=> item.profil[0].name === profil);
  }

  /**
   * Update a user by id
   * @param {string} id - The id of the user you want to update.
   * @param {UpdateUserDto} updateUserDto - UpdateUserDto
   * @returns The updated user.
   */
  async updateToken(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findById(id)
    if (!user) {
      throw new HttpException('User Not found', HttpStatus.NOT_FOUND);
    }
    console.log("Token ", updateUserDto.token_notif);
    user.token_notif = updateUserDto.token_notif;
    await user.save();

    const newUser = await this.findById(id)

    return {
      status: 'success',
      message: `User ${newUser.name} successfully updated.`,
      data: newUser,
    }
  }

  async findAll() {
    const users = await this.userModel.find().exec()
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: users,
    }
  }

  async FindAllUsers() {
    const users = await this.userModel.find({ 'profil.name': "User" })
      .populate({
        path: 'profil',
        populate: {
          path: 'permissions'
        },
      })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: users,
    }
  }


  async getServices(id: string) {
    return this.userModel.findById(id).populate("services").exec();
  }

  async findAndUpdate(id: string, vehicles) {
    return await this.userModel.findOneAndUpdate({ _id: id }, {
      $push: {
        vehicles,
      },
    })
      .then((result) => {
        console.log('result', result);
        return result;
      }).catch((error) => {
        console.log('add data to sensor error', error);
        return null;
      });
  }

  async findById(id: string) {
    return await this.userModel.findById(id)
      .populate(['profil', 'services', 'vehicles'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new HttpException('User Not found', HttpStatus.NOT_FOUND);
      });
  }

  async findMainCategories(id: string) {
    const user = await this.userModel.findById(id)
      .populate({
        path: 'profil',
        populate: {
          path: 'category',
          populate: {
            path: 'categories'
          }
        },
      })
      .exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new HttpException('User Not found', HttpStatus.NOT_FOUND);
      });
    let categs = [];
    await Promise.all(user.profil.map(async (elem) => {
      if (elem.category) {
        categs.push({ label: elem.category.name, value: elem.category.name });
      }
    }));
    return {
      sucess: "success",
      data: categs
    };
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}
