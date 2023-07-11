import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Sensor, SensorDocument } from './schemas/sensor.schema';
import { Model } from 'mongoose';
import { EquipmentsService } from '../equipments/equipments.service';
import { TypeDataService } from '../type-data/type-data.service';
import { CreateSensorKalioDto } from './dto/create-sensor-kalio.dto';

@Injectable()
export class SensorService {
  constructor(
    @InjectModel(Sensor.name) private sensorModel: Model<SensorDocument>,
    private readonly equipmentsService: EquipmentsService,
    private readonly typedataService: TypeDataService
  ) {}

  makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return "SK-"+result;
  }

  async create(createSensorDto: CreateSensorDto) {
    const type = await this.typedataService.findById(createSensorDto.typdataId);
    const equipment = await this.equipmentsService.findById(createSensorDto.equipmentId);
    const sensor = new this.sensorModel(createSensorDto)
    sensor.device = equipment._id
    sensor.typedata = type._id
    sensor.type = true;
    sensor.sensorId = this.makeid(6);
    await sensor.save();

    equipment.sensors.push(sensor._id);
    equipment.save();

    return {
      status: "success",
      message: "Sensor successfully created.",
      data: sensor,
    }
  }

  async createForKalio(createSensorDto: CreateSensorKalioDto) {
    const type = await this.typedataService.findById(createSensorDto.typdataId);
    const sensor = new this.sensorModel(createSensorDto)
    sensor.typedata = type._id
    sensor.type = false;
    sensor.sensorId = this.makeid(6);
    await sensor.save();

    return {
      status: "success",
      message: "Sensor successfully created.",
      data: sensor,
    }
  }

  async findBySensorId(id: string) {
    const sensor = await this.sensorModel.findOne({sensorId: id}).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getSensorById error', err)
      });

    if(!sensor){
      throw new HttpException('Sensor Not found 56', HttpStatus.NOT_FOUND);
    }

    return sensor;
  }

  async findById(id: string) {
    const sensor = await this.sensorModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getSensorById error', err)
      });

    if(!sensor){
      throw new HttpException('Sensor Not found 56', HttpStatus.NOT_FOUND);
    }

    return sensor;
  }

  async findByDevice(device: string) {
    const sensors = await this.sensorModel.find({ 'device': { $in: device } }).populate(['device', 'datas', 'notifications'])
      .then((result) =>{
        return result;
      }).catch((error) => {
        return error;
      })
      let res = [];
      if(sensors.length > 0){
        await Promise.all(sensors.map(async (elem) => {
          res.push({label: elem.name, value: elem._id});
        }));
      }

    return {
      status: "success",
      data: res,
    }
  }

  async findAll() {
    const sensors = await this.sensorModel.find().populate(['device', 'datas', 'notifications'])
      .then((result) =>{
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: sensors,
    }
  }

  async findOne(id: string) {
    const sensor = await this.sensorModel.findById(id).populate(['device', 'datas', 'notifications'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new HttpException('Sensor Not found', HttpStatus.NOT_FOUND);
      });

    if(!sensor){
      throw new HttpException('Sensor Not found', HttpStatus.NOT_FOUND);
    }

    return {
      status: 'success',
      data: sensor,
    }
  }

  async update(id: string, updateSensorDto: UpdateSensorDto) {
    const sensor = await this.findById(id)
    if(!sensor){
      throw new HttpException('Sensor Not found', HttpStatus.NOT_FOUND);
    }
    await this.sensorModel.findOneAndUpdate({_id: id}, {
      $set: { ...updateSensorDto }
    })
      .then((result) =>{
        return result;
      }).catch((error) => {
        console.error('update Equipment error', error)
        return error;
      })

    const updateSensor = await this.findById(id)

    if(updateSensorDto.equipmentId){
      const device = await this.equipmentsService.findById(updateSensorDto.equipmentId);
      updateSensor.device = device._id;
    }

    if(updateSensorDto.typdataId){
      const type = await this.typedataService.findById(updateSensorDto.typdataId);
      updateSensor.typedata = type._id;
    }
    updateSensor.save();

    const newSensor = await this.findById(id)

    return {
      status: 'success',
      message: `Sensor ${newSensor.name} successfully updated.`,
      data: newSensor,
    }
  }

  async remove(id: string) {
    const sensor = await this.findById(id)
    if(!sensor){
      throw new HttpException('Sensor Not found', HttpStatus.NOT_FOUND);
    }
    await this.sensorModel.findOneAndDelete({_id: id})
      .then((result) =>{
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: 'success',
      message: "Sensor successfully deleted.",
    }
  }
}
