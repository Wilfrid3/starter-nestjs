import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfilDto } from './dto/create-profil.dto';
import { UpdateProfilDto } from './dto/update-profil.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Profil, ProfilDocument } from './schema/profil.schema';
import { Model } from 'mongoose';
import { PerimissionService } from '../perimission/perimission.service';

@Injectable()
export class ProfilService {
  constructor(
    @InjectModel(Profil.name) private profilModel: Model<ProfilDocument>,
    private readonly permissionService: PerimissionService
  ) {}

  async create(createProfilDto: CreateProfilDto) {
    try {
      const newProfil = new this.profilModel(createProfilDto);
      let perms = [];
      perms = JSON.parse(createProfilDto.permissionId);
      newProfil.permissions = perms;
      newProfil.save();
      // return [succes:true, data:newProfil, msg:"Service Created"];
      return newProfil;
    } catch (error) {
      // return {'succes':false, 'data':error, 'msg':"Created Error"};
      return error;
    }
  }

  async findById(id: string) {
    const profile = await this.profilModel.findById(id).populate('category')
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('findById profile', err)
      });

    if(!profile){
      throw new HttpException('Profile Not found', HttpStatus.NOT_FOUND);
    }

    return profile
  }

  async findByName(name: string) {
    const profile = await this.profilModel.findOne({name: name}).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('findByName profile', err)
      });

    if(!profile){
      throw new HttpException('Profile Not found', HttpStatus.NOT_FOUND);
    }

    return profile
  }

  async findAll() {
    const profiles = await this.profilModel.find().exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('Find All profile', err)
      });

    return {
      success:"success",
      data:profiles
    };
  }

  async findOne(id: string) {
    return await this.profilModel.findById(id).exec();
  }

  async update(id: string, updateProfilDto: UpdateProfilDto) {
    try {
      const updateProfil = await this.profilModel.findByIdAndUpdate(id, {
        $set: { ...updateProfilDto },
      });
      // return {'succes':true, 'data':updateService, 'msg':"Service Updated"};
      return updateProfil;
    } catch (error) {
      // return {'succes':false, 'data':error, 'msg':"Updated Error"};
      return error;
    }
  }

  async remove(id: string) {
    return await this.profilModel.findByIdAndDelete(id);
  }
}
