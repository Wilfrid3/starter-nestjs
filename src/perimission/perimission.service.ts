import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePerimissionDto } from './dto/create-perimission.dto';
import { UpdatePerimissionDto } from './dto/update-perimission.dto';
import { PermissionDocument, Permission } from './schema/permission.schema';

@Injectable()
export class PerimissionService {
  
  constructor(@InjectModel(Permission.name) private permissionModel: Model<PermissionDocument>) { }

  async create(createPerimissionDto: CreatePerimissionDto) {
    try {
      const newPermission = new this.permissionModel(createPerimissionDto);
      newPermission.save();
      return {
        status: "success",
        message: "Permission successfully created.",
        data: newPermission,
      }
    } catch (error) {
      return {
        status: "error",
        message: error,
        data: null,
      }
    }
  }

  async findAll() {
    return await this.permissionModel.find().exec();
  }

  async findOne(id: string) {
    const permission = await this.permissionModel.findById(id).exec()
    .then((result)=>{
      return result;
    })
    .catch((error)=>{
      console.log("FIND ONE PERMISSION ERROR : ",error);
    });
    return permission;
  }

  async update(id: string, updatePerimissionDto: UpdatePerimissionDto) {
    try {
      const updatePermission = await this.permissionModel.findByIdAndUpdate(id, {
        $set: { ...updatePerimissionDto },
      });
      // return {'succes':true, 'data':updateService, 'msg':"Service Updated"};
      return updatePermission;
    } catch (error) {
      // return {'succes':false, 'data':error, 'msg':"Updated Error"};
      return error;
    }
  }

  async remove(id: string) {
    return await this.permissionModel.findByIdAndDelete(id);
  }
}
