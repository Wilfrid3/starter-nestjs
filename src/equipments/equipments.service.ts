import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Equipment, EquipmentDocument } from './schemas/equipment.schema';
import { Model } from 'mongoose';
import { FarmsService } from '../farms/farms.service';
import { TypequipmentsService } from '../typequipments/typequipments.service';
import { Sensor, SensorDocument } from 'src/sensor/schemas/sensor.schema';

@Injectable()
export class EquipmentsService {
  constructor(
    @InjectModel(Equipment.name) private equipmentModel: Model<EquipmentDocument>,
    @InjectModel(Sensor.name) private sensorModel: Model<SensorDocument>,
    private readonly farmsService: FarmsService,
    private readonly typequipmentsService: TypequipmentsService
  ) { }

  makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async create(createEquipmentDto: CreateEquipmentDto) {
    const farm = await this.farmsService.findById(createEquipmentDto.farmId);
    const typequipment = await this.typequipmentsService.findById(createEquipmentDto.typequipmentId);
    if (typequipment.name === "Kalio Device") {
      // const deviceId = this.makeid(5);
      // createEquipmentDto.deviceId = deviceId;
      const equipment = new this.equipmentModel(createEquipmentDto)
      equipment.farm = farm._id
      equipment.typequipment = typequipment._id
      await equipment.save();

      farm.devices.push(equipment._id);
      farm.save();

      const sensors = await this.sensorModel.find({ type: 0 }).exec()
        .then((result) => {
          return result;
        }).catch((error) => {
          return error;
        });
      if (sensors.length > 0) {
        await sensors.forEach(async (item) => {
          await this.equipmentModel.findOneAndUpdate({ _id: equipment._id }, {
            $push: {
              sensors: item
            },
          })
            .then((result) => {
              console.log('result', result);
            }).catch((error) => {
              console.log('update Equipment sensor', error);
            });
        });
      }

      return {
        status: "success",
        message: "Equipment successfully created.",
        data: equipment,
      }
    } else {
      const deviceId = this.makeid(5);
      createEquipmentDto.deviceId = deviceId;
      const equipment = new this.equipmentModel(createEquipmentDto)
      equipment.farm = farm._id
      equipment.typequipment = typequipment._id
      await equipment.save();

      farm.devices.push(equipment._id);
      farm.save();

      return {
        status: "success",
        message: "Equipment successfully created.",
        data: equipment,
      }
    }
  }

  async findByDeviceId(id: string) {
    const device = await this.equipmentModel
      .findOne({ deviceId: id }).populate(['typequipment'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new HttpException('Device Not found', HttpStatus.NOT_FOUND);
      });
    if (!device) {
      throw new HttpException('Device Not found', HttpStatus.NOT_FOUND);
    }
    return device;
  }

  async findById(id: string) {
    const equipment = await this.equipmentModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getEquipmentById error', err)
      });

    if (!equipment) {
      throw new HttpException('Equipment Not found 56', HttpStatus.NOT_FOUND);
    }

    return equipment;
  }

  async findAll() {
    const equipments = await this.equipmentModel.find().populate(['farm', 'typequipment', 'sensors'])
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: equipments,
    }
  }


  async findByFarm(farmId: string) {
    const farm = await this.farmsService.findById(farmId);
    if (!farm) {
      throw new HttpException('Farm Not found', HttpStatus.NOT_FOUND);
    }

    const equipments = await this.equipmentModel.find({ 'farm': { $in: farmId } }).populate(['farm', 'typequipment'])
    .populate({
      path: 'sensors',
      populate: {
        path: 'datas',
        populate: {
          path: 'sensor'
        }
      },
    }).populate({
      path: 'sensors',
      populate: {
        path: 'typedata'
      },
    });

    if (!equipments) {
      throw new HttpException('Equipments Not found', HttpStatus.NOT_FOUND);
    }

    return {
      status: 'success',
      data: equipments,
    };
  }

  async findOne(id: string) {
    const equipment = await this.equipmentModel.findById(id).populate(['farm', 'typequipment'])
      .populate({
        path: 'sensors',
        populate: {
          path: 'datas',
          populate: {
            path: 'sensor'
          }
        },
      })
      .populate({
        path: 'sensors',
        populate: {
          path: 'typedata'
        },
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new HttpException('Equipment Not found', HttpStatus.NOT_FOUND);
      });

    if (!equipment) {
      throw new HttpException('Equipment Not found', HttpStatus.NOT_FOUND);
    }

    return {
      status: 'success',
      data: equipment,
    }
  }

  async update(id: string, updateEquipmentDto: UpdateEquipmentDto) {
    const equipment = await this.findById(id)
    if (!equipment) {
      throw new HttpException('Equipment Not found', HttpStatus.NOT_FOUND);
    }
    await this.equipmentModel.findOneAndUpdate({ _id: id }, {
      $set: { ...updateEquipmentDto }
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        console.error('update Equipment error', error)
        return error;
      })

    const updateEquip = await this.findById(id)

    if (updateEquipmentDto.typequipmentId) {
      const typequipment = await this.typequipmentsService.findById(updateEquipmentDto.typequipmentId);
      updateEquip.typequipment = typequipment._id;
      updateEquip.save();
    }

    const newEquipment = await this.findById(id)

    return {
      status: 'success',
      message: `Equipment ${newEquipment.name} successfully updated.`,
      data: newEquipment,
    }
  }

  async remove(id: string) {
    const equipment = await this.findById(id)
    if (!equipment) {
      throw new HttpException('Equipment Not found', HttpStatus.NOT_FOUND);
    }
    await this.equipmentModel.findOneAndDelete({ _id: id })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: 'success',
      message: "Equipment successfully deleted.",
    }
  }
}
