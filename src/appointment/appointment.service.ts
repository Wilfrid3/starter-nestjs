import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { CreateAppointmentExpertDto } from './dto/create-appointment-expert.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment, AppointmentDocument } from './schemas/appointment.schema';
import { Transaction, TransactionDocument } from '../transaction/schemas/transaction.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { PlagesService } from '../plages/plages.service';
import { LaboratoriesService } from '../laboratories/laboratories.service';
import { AgroExpertService } from '../agro-expert/agro-expert.service';
import { ServicesService } from 'src/services/services.service';
import { DaysService } from 'src/days/days.service';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name) private appointmentModel: Model<AppointmentDocument>,
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
    private readonly usersService: UsersService,
    private readonly plageService: PlagesService,
    private readonly labortoryService: LaboratoriesService,
    private readonly expertService: AgroExpertService,
    private readonly serviceService: ServicesService,
    private readonly dayService: DaysService
  ) { }

  makeid(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  async create(createAppointmentDto: CreateAppointmentDto, file: Express.Multer.File) {
    if (file) {
      createAppointmentDto['image'] = file.path.split("/")[1];
    }
    const user = await this.usersService.findById(createAppointmentDto.user);
    const range = await this.plageService.findById(createAppointmentDto.range);
    const service = await this.serviceService.findById(createAppointmentDto.service);
    const laboratory = await this.labortoryService.findById(createAppointmentDto.laboratory);
    const day = await this.dayService.findById(createAppointmentDto.bookDate);
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let d = new Date();
    d.setDate(d.getDate() + ((((days.indexOf(day.name)+1) + 7 - d.getDay()) % 7) || 7));
    d.setHours(range.start.getHours());
    d.setMinutes(range.start.getMinutes());
    createAppointmentDto['bookDate'] = d.toDateString();
    // createAppointmentDto['bookDate'] = createAppointmentDto['bookDate'] + " " + range.end.getHours() + ":" + range.end.getMinutes();
    const appointment = new this.appointmentModel(createAppointmentDto)
    // appointment.bookDate = this.getNextDay(range.end, new Date(range.day.name).getDay());
    appointment.user = user._id
    appointment.range = range._id
    appointment.roomName = this.makeid(8)
    appointment.laboratory = laboratory._id
    appointment.service = service._id
    await appointment.save();

    laboratory.appointments.push(appointment._id);
    await laboratory.save();

    let mod = { appointment: appointment._id, type: 1, status: 1, ref: createAppointmentDto.ref, user: laboratory.user._id, amount: createAppointmentDto.amount, libelle: "Booking service from " + user.phone };
    console.log(mod);
    const transaction = new this.transactionModel(mod);
    await transaction.save();

    return {
      statusCode: 201,
      status: "success",
      message: "Appointment successfully created.",
      data: appointment,
    }
  }

  getNextDay(date: Date, day: number) {
    const dateCopy = new Date(date.getTime());

    const nextMonday = new Date(
      dateCopy.setDate(
        dateCopy.getDate() + ((7 - day + 1) % 7 || 7),
      ),
    );

    return nextMonday;
  }

  async createExpertAppointment(createAppointmentExpertDto: CreateAppointmentExpertDto, file: Express.Multer.File) {
    if (file) {
      createAppointmentExpertDto['image'] = file.path.split("/")[1];
    }
    const user = await this.usersService.findById(createAppointmentExpertDto.user);
    const range = await this.plageService.findById(createAppointmentExpertDto.range);
    const expert = await this.expertService.findById(createAppointmentExpertDto.expert);
    const service = await this.serviceService.findById(createAppointmentExpertDto.service);
    const day = await this.dayService.findById(createAppointmentExpertDto.bookDate);
    const book = await this.findIfUserAlreadyBook(user._id, range._id);
    if (book) {
      throw new HttpException('Already book for this range', HttpStatus.NOT_FOUND);
    }
    console.log(day, range.start);
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let d = new Date();
    d.setDate(d.getDate() + ((((days.indexOf(day.name)+1) + 7 - d.getDay()) % 7) || 7));
    d.setHours(range.start.getHours());
    d.setMinutes(range.start.getMinutes());
    console.log("Book Date ", d.toString());
    createAppointmentExpertDto['bookDate'] = d.toString();
    // createAppointmentExpertDto['bookDate'] = createAppointmentExpertDto['bookDate'] + " " + range.end.getHours() + ":" + range.end.getMinutes();
    const appointment = new this.appointmentModel(createAppointmentExpertDto)
    // appointment.bookDate = this.getNextDay(range.end, new Date(range.day.name).getDay());
    appointment.user = user._id
    appointment.range = range._id
    appointment.expert = expert._id
    appointment.roomName = this.makeid(8)
    appointment.service = service._id
    await appointment.save();

    this.plageService.changeStatus(range._id, 2);

    let mod = { appointment: appointment._id, type: 1, status: 1, ref: createAppointmentExpertDto.ref, user: expert.user._id, amount: createAppointmentExpertDto.amount, libelle: "Booking service from " + user.phone };
    console.log(mod);
    const transaction = new this.transactionModel(mod);
    await transaction.save();

    expert.appointments.push(appointment._id);
    await expert.save();

    return {
      statusCode: 201,
      status: "success",
      message: "Appointment successfully created.",
      data: appointment,
    }
  }

  async findAllForExpert(id: string) {
    const appointments = await this.appointmentModel.find({ 'expert': { $in: id } }).populate(['user', 'range', 'expert', 'service'])
      .then((result) => {
        return result;
      }).catch((error) => {
        console.log(error);
      })

    return {
      status: "success",
      data: appointments,
    }
  }

  async findByUserForExpert(id: string) {
    const appointments = await this.appointmentModel.find({ 'user': { $in: id } }).populate(['user', 'expert', 'service'])
      .populate({
        path: 'range',
        populate: {
          path: 'day'
        }
      })
      .then((result) => {
        return result;
      }).catch((error) => {
        console.log(error);
      })

    return {
      status: "success",
      data: appointments,
    }
  }

  async findByIdForExpert(id: string) {
    const appointment = await this.appointmentModel.findById(id).populate(['user', 'range', 'expert', 'service'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getAppointmentById error', err)
      });

    if (!appointment) {
      throw new HttpException('Appointment Not found 56', HttpStatus.NOT_FOUND);
    }

    return appointment;
  }

  async findAll(id: string) {
    const appointments = await this.appointmentModel.find({ 'laboratory': { $in: id } }).populate(['user', 'range', 'laboratory', 'service'])
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: appointments,
    }
  }

  async findByUser(id: string) {
    const cutoff = new Date();
    const appointments = await this.appointmentModel.find({ $and: [{ 'user': { $in: id } }] }).sort({ 'createdAt': -1 }).populate('user')
      .populate({
        path: 'laboratory',
        populate: {
          path: 'user'
        }
      })
      .populate({
        path: 'expert',
        populate: {
          path: 'user'
        }
      })
      .populate({
        path: 'range',
        populate: {
          path: 'day'
        }
      })
      .populate({
        path: 'service',
        populate: {
          path: 'user'
        }
      })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: appointments,
    }
  }

  async rejectedPlanning(id: string) {
    await this.appointmentModel.updateOne({ _id: id }, {
      etat: 3
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    const newAppointment = await this.findById(id)

    return {
      status: 'success',
      message: `Appoiontment successfully rejected.`,
      data: newAppointment,
    }
  }

  async confirmPlanning(id: string) {
    await this.appointmentModel.updateOne({ _id: id }, {
      etat: 1
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    const newAppointment = await this.findById(id)

    return {
      status: 'success',
      message: `Appoiontment successfully accepted.`,
      data: newAppointment,
    }
  }

  async acceptedPlanning(id: string) {
    await this.appointmentModel.updateOne({ _id: id }, {
      etat: 2
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    const newAppointment = await this.findById(id)

    return {
      status: 'success',
      message: `Appoiontment successfully accepted.`,
      data: newAppointment,
    }
  }

  async findById(id: string) {
    const appointment = await this.appointmentModel.findById(id).populate(['user', 'range', 'laboratory'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getAppointmentById error', err)
      });

    if (!appointment) {
      throw new HttpException('Appointment Not found 56', HttpStatus.NOT_FOUND);
    }

    return appointment;
  }

  async findIfUserAlreadyBook(id: string, range: string) {
    const appointment = await this.appointmentModel.findOne({ 'user': id, 'range': range }).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getAppointmentById error', err)
      });

    if (appointment) {
      return true;
    }

    return false;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.findById(id)
    if (!appointment) {
      throw new HttpException('Appointment Not found', HttpStatus.NOT_FOUND);
    }
    await this.appointmentModel.findOneAndUpdate({ _id: id }, {
      $set: { ...updateAppointmentDto }
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        console.error('update appointment error', error)
        return error;
      })

    const newAppointment = await this.findById(id)

    return {
      status: 'success',
      message: `Appointment successfully updated.`,
      data: newAppointment,
    }
  }

  async remove(id: string) {
    const appointment = await this.findById(id)
    if (!appointment) {
      throw new HttpException('Appointment Not found', HttpStatus.NOT_FOUND);
    }
    await this.appointmentModel.findOneAndDelete({ _id: id })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: 'success',
      message: "Appointment successfully deleted.",
    }
  }
}
