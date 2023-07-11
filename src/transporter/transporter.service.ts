import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProfilService } from 'src/profil/profil.service';
import { UsersService } from 'src/users/users.service';
import { VehicleService } from 'src/vehicle/vehicle.service';
import { AssignTransporterDto } from './dto/assign-transporter.dto';
import { CreateTransporterDto } from './dto/create-transporter.dto';
import { UpdateTransporterDto } from './dto/update-transporter.dto';
import { Transporter, TransporterDocument } from './schemas/transporter.schema';

@Injectable()
export class TransporterService {
  constructor(
    @InjectModel(Transporter.name) private transporterModel: Model<TransporterDocument>,
    private readonly usersService: UsersService,
    private readonly profileService: ProfilService,
    private readonly vehicleService: VehicleService
  ) { }

  async create(createTransporterDto: CreateTransporterDto, files) {
    if (files) {
      files.forEach((item) => {
        createTransporterDto[item.fieldname] = item.filename;
      })
    } else {
      return {
        status: "error",
        message: "Please upload image",
        data: null,
      }
    }
    const agency = await this.usersService.findById(createTransporterDto.agency);
    const transporter = new this.transporterModel(createTransporterDto);
    const userData = { name: createTransporterDto.name, phone: "+237"+createTransporterDto.phone };
    const user = await this.usersService.createWithProfile(userData, "Transporter");
    console.log(user);
    transporter.user = user._id;
    transporter.agency = agency._id;
    await transporter.save();

    return {
      status: "success",
      message: "Transporter successfully created.",
      data: transporter,
    }
  }

  async assign(assignTransporterDto: AssignTransporterDto) {
    const user = await this.usersService.findById(assignTransporterDto.user);
    const vehicle = await this.vehicleService.findById(assignTransporterDto.vehicle);
    const users = await this.usersService.findAll();
    await Promise.all(users.data.map(async (item) => {
      const find = await item.vehicles.some((veh) => {
        return veh._id === vehicle._id ? true : false;
      });
      if (find) {
        const objWithIdIndex = item.vehicles.findIndex((obj) => obj._id === vehicle._id);

        if (objWithIdIndex > -1) {
          item.vehicles.splice(objWithIdIndex, 1);
        }
        const newUser = await this.usersService.findAndUpdate(item._id, item.vehicles);
      }
    }));
    user.vehicles.push(vehicle._id);
    await user.save();

    return {
      status: "success",
      message: "Vehicle successfully assign.",
      data: user,
    }
  }

  async findAll() {
    const transporters = await this.transporterModel.find().populate({
      path: 'user',
      populate: {
        path: 'vehicles',
      }
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: transporters,
    }
  }

  async findById(id: string) {
    const transporter = await this.transporterModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getTransporterById error', err)
      });

    if (!transporter) {
      throw new HttpException('Transporter Not found 56', HttpStatus.NOT_FOUND);
    }

    return transporter;
  }

  async findOne(id: string) {
    const transporter = await this.transporterModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getTransporterById error', err)
      });

    if (!transporter) {
      throw new HttpException('Transporter Not found 56', HttpStatus.NOT_FOUND);
    }

    return transporter;
  }

  async findByAgency(id: string) {
    const transporter = await this.transporterModel.find({ 'agency': { $in: id } })
      .populate({
        path: 'user',
        populate: {
          path: 'vehicles'
        },
      })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: transporter,
    }
  }

  async findByUser(id: string) {
    const transporter = await this.transporterModel.find({ 'user': { $in: id } })
      .populate({
        path: 'user',
        populate: {
          path: 'vehicles'
        },
      })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: transporter,
    }
  }

  async update(id: string, updateTransporterDto: UpdateTransporterDto, file: Express.Multer.File) {
    if (file) {
      updateTransporterDto['image'] = file.path.split("/")[1];
    }
    const transporter = await this.findById(id)
    if (!transporter) {
      throw new HttpException('Transporter Not found', HttpStatus.NOT_FOUND);
    }
    const updateProducer = await this.transporterModel.findOneAndUpdate({ _id: id }, {
      $set: { ...updateTransporterDto }
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        console.error('update agroexpert error', error)
        return error;
      })

    const newtransporter = await this.findById(id)

    return {
      status: 'success',
      message: `Transporter ${newtransporter.name} successfully updated.`,
      data: newtransporter,
    }
  }

  async remove(id: string) {
    const transporter = await this.findById(id)
    if (!transporter) {
      throw new HttpException('Transporter Not found', HttpStatus.NOT_FOUND);
    }
    await this.transporterModel.findOneAndDelete({ _id: id })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: 'success',
      message: "Transporter successfully deleted.",
    }
  }
}
