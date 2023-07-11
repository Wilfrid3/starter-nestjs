import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Notification, NotificationDocument } from './schemas/notification.schema';
import { Model } from 'mongoose';
import { SensorService } from '../sensor/sensor.service';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
    private readonly sensorService: SensorService
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const sensor = await this.sensorService.findById(createNotificationDto.sensorId);
    const notification = new this.notificationModel(createNotificationDto)
    notification.sensor = sensor._id
    await notification.save();

    sensor.notifications.push(notification._id);
    sensor.save();

    return {
      status: "success",
      message: "Notification successfully created.",
      data: notification,
    }
  }

  findAll() {
    return `This action returns all notification`;
  }

  findOne(id: string) {
    return `This action returns a #${id} notification`;
  }

  update(id: string, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: string) {
    return `This action removes a #${id} notification`;
  }
}
