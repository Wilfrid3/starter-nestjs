import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDataEquipmentDto } from './dto/create-data-equipment.dto';
import { UpdateDataEquipmentDto } from './dto/update-data-equipment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Data, DataDocument } from './schemas/data.schema';
import { Model } from 'mongoose';
import { SensorService } from '../sensor/sensor.service';
import { PostDeviceData } from './dto/post-device-data.dto';
import { UsersService } from 'src/users/users.service';
import { EquipmentsService } from 'src/equipments/equipments.service';
import { Sensor, SensorDocument } from 'src/sensor/schemas/sensor.schema';

@Injectable()
export class DataEquipmentService {
  constructor(
    @InjectModel(Data.name) private dataModel: Model<DataDocument>,
    @InjectModel(Sensor.name) private sensorModel: Model<SensorDocument>,
    private readonly sensorService: SensorService,
    private readonly userService: UsersService,
    private readonly deviceService: EquipmentsService
  ) { }

  async create(createDataEquipmentDto: CreateDataEquipmentDto) {
    const sensor = await this.sensorService.findById(createDataEquipmentDto.sensor);
    const data = new this.dataModel(createDataEquipmentDto)
    data.sensor = sensor._id
    await data.save();

    sensor.datas.push(data._id);
    sensor.save();

    return {
      status: "success",
      message: "Data successfully created.",
      data: data,
    }
  }

  async postDeviceData(postDeviceData : PostDeviceData) {
    console.log("POST DATA", postDeviceData);
    const device = await this.deviceService.findByDeviceId(postDeviceData.deviceId);
    if (device?.typequipment?.name === "Custom Device" && !postDeviceData.token) {
      throw new HttpException('Token is required for your Device', HttpStatus.BAD_REQUEST);
    } else if (device?.typequipment?.name === "Custom Device" && postDeviceData.token) {
      const user = await this.userService.findByToken(postDeviceData.token);
    }
    if (postDeviceData.sensor1) {
      const id = postDeviceData.sensor1.split("+")[0];
      const value = postDeviceData.sensor1.split("+")[1];
      const sensor = await this.sensorService.findBySensorId(id);
      const data = new this.dataModel({ data: value, sensor: sensor._id });
      data.save();
      await this.sensorModel.findOneAndUpdate({ _id: sensor._id }, {
        $push: {
          datas: data,
        },
      })
        .then((result) => {
          console.log('result', result);
        }).catch((error) => {
          console.log('add data to sensor error', error);
        });
    }
    if (postDeviceData?.sensor2) {
      const id = postDeviceData?.sensor2.split("+")[0];
      const value = postDeviceData?.sensor2.split("+")[1];
      const sensor = await this.sensorService.findBySensorId(id);
      const data = new this.dataModel({ data: value, sensor: sensor._id });
      data.save();
      await this.sensorModel.findOneAndUpdate({ _id: sensor._id }, {
        $push: {
          datas: data,
        },
      })
        .then((result) => {
          console.log('result', result);
        }).catch((error) => {
          console.log('add data to sensor error', error);
        });
    }
    if (postDeviceData?.sensor3) {
      const id = postDeviceData?.sensor3.split("+")[0];
      const value = postDeviceData?.sensor3.split("+")[1];
      const sensor = await this.sensorService.findBySensorId(id);
      const data = new this.dataModel({ data: value, sensor: sensor._id });
      data.save();
      await this.sensorModel.findOneAndUpdate({ _id: sensor._id }, {
        $push: {
          datas: data,
        },
      })
        .then((result) => {
          console.log('result', result);
        }).catch((error) => {
          console.log('add data to sensor error', error);
        });
    }
    if (postDeviceData?.sensor4) {
      const id = postDeviceData?.sensor4.split("+")[0];
      const value = postDeviceData?.sensor4.split("+")[1];
      const sensor = await this.sensorService.findBySensorId(id);
      const data = new this.dataModel({ data: value, sensor: sensor._id });
      data.save();
      await this.sensorModel.findOneAndUpdate({ _id: sensor._id }, {
        $push: {
          datas: data,
        },
      })
        .then((result) => {
          console.log('result', result);
        }).catch((error) => {
          console.log('add data to sensor error', error);
        });
    }
    if (postDeviceData?.sensor5) {
      const id = postDeviceData?.sensor5.split("+")[0];
      const value = postDeviceData?.sensor5.split("+")[1];
      const sensor = await this.sensorService.findBySensorId(id);
      const data = new this.dataModel({ data: value, sensor: sensor._id });
      data.save();
      await this.sensorModel.findOneAndUpdate({ _id: sensor._id }, {
        $push: {
          datas: data,
        },
      })
        .then((result) => {
          console.log('result', result);
        }).catch((error) => {
          console.log('add data to sensor error', error);
        });
    }
    if (postDeviceData?.sensor6) {
      const id = postDeviceData?.sensor6.split("+")[0];
      const value = postDeviceData?.sensor6.split("+")[1];
      const sensor = await this.sensorService.findBySensorId(id);
      const data = new this.dataModel({ data: value, sensor: sensor._id });
      data.save();
      await this.sensorModel.findOneAndUpdate({ _id: sensor._id }, {
        $push: {
          datas: data,
        },
      })
        .then((result) => {
          console.log('result', result);
        }).catch((error) => {
          console.log('add data to sensor error', error);
        });
    }
    return {
      success: true
    };
  }

  async findById(id: string) {
    const data = await this.dataModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getDataEquipmentById error', err)
      });

    if (!data) {
      throw new HttpException('Data Equipment Not found 56', HttpStatus.NOT_FOUND);
    }

    return data;
  }

  async findAverageBySensor(id: string) {
    const sensor = await this.sensorService.findById(id);
    const datas = await this.dataModel.find({ 'sensor': { $in: sensor } }).exec()
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })
    let sum = 0;
    let average = 0;
    if (datas.length > 0) {
      await Promise.all(datas.map(async (e) => {
        sum += parseFloat(e.data.toString());
      }));
      average = sum / datas.length;
    }

    return {
      status: "success",
      data: Math.round(average),
    }
  }

  async requestGraphData(id: string, start: string, end: string) {
    const sensor = await this.sensorService.findById(id);
    const datas = await this.findBySensor(id);
    const startDate = new Date(start);
    const endDate = new Date(end);
    console.log(startDate, endDate);
    const date = new Date(startDate.getTime());
    const dates = [];
    const labels = [];
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    while (date <= endDate) {
      dates.push(new Date(date));
      labels.push(days[new Date(date).getDay()]);
      date.setDate(date.getDate() + 1);
    }
    console.log(dates);
    let graph = {
      labels: labels, legend: ["Environment Statistics {Sensor : " + sensor.name + "}"], datasets: [
        {
          data: [],
          color: (opacity = 1) => `rgba(28, 154, 78, ${opacity})`, // optional
          strokeWidth: 2, // optional
        },
      ],
    };

    await Promise.all(dates.map(async (elem) => {
      let match_stage = {
        $match: {
          createdAt: { $gte: new Date(elem) }
        }
      }

      let group_stage = {
        $group: {
          _id: "$createdAt",
          count: { $avg: "$data" }
        }
      }
      let pipeline = [match_stage]
      const datas = await this.dataModel.find({
        createdAt: {
          $gte: new Date(elem)
        }
      });
      let sum = 0;
      let average = 0;
      if (datas.length > 0) {
        await Promise.all(datas.map(async (e) => {
          sum += parseFloat(e.data.toString());
        }));
        average = sum / datas.length;
      }
      graph.datasets[0].data.push(average);
    }));

    return graph;

  }

  async findAll() {
    const dataequipments = await this.dataModel.find().populate(['sensor'])
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: dataequipments,
    }
  }

  async findBySensor(id: string) {
    const data = await this.dataModel.find({ sensor: id }).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new HttpException('Data Equipment Not found', HttpStatus.NOT_FOUND);
      });

    if (!data) {
      throw new HttpException('Data Equipment Not found', HttpStatus.NOT_FOUND);
    }

    return data;
  }

  async findByEquipment(id: string) {
    const data = await this.dataModel.findOne({ device: id }).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new HttpException('Data Equipment Not found', HttpStatus.NOT_FOUND);
      });

    if (!data) {
      throw new HttpException('Data Equipment Not found', HttpStatus.NOT_FOUND);
    }

    return {
      status: 'success',
      data: data,
    }
  }

  async update(id: string, updateDataEquipmentDto: UpdateDataEquipmentDto) {
    const data = await this.findById(id)
    if (!data) {
      throw new HttpException('Data Equipment Not found', HttpStatus.NOT_FOUND);
    }
    await this.dataModel.findOneAndUpdate({ _id: id }, {
      $set: { ...updateDataEquipmentDto }
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        console.error('update data equipment error', error)
        return error;
      })

    const newData = await this.findById(id)

    return {
      status: 'success',
      message: `Data Equipment successfully updated.`,
      data: newData,
    }
  }

  async remove(id: string) {
    const data = await this.findById(id)
    if (!data) {
      throw new HttpException('Data Not found', HttpStatus.NOT_FOUND);
    }
    await this.dataModel.findOneAndDelete({ _id: id })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: 'success',
      message: "Data Equipment successfully deleted.",
    }
  }
}
