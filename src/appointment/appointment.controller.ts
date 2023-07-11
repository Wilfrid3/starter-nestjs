import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UploadedFile, UseInterceptors, Res } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { CreateAppointmentExpertDto } from './dto/create-appointment-expert.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file',
    {
      storage: diskStorage({
        destination: './images',
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return cb(null, `${randomName}${extname(file.originalname)}`)
        }
      })
    }
  )
  )
  create(@Body() createAppointmentDto: CreateAppointmentDto, @UploadedFile() file: Express.Multer.File) {
    return this.appointmentService.create(createAppointmentDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Post('expert')
  @UseInterceptors(FileInterceptor('file',
    {
      storage: diskStorage({
        destination: './images',
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return cb(null, `${randomName}${extname(file.originalname)}`)
        }
      })
    }
  )
  )
  createExpertAppointment(@Body() createAppointmentExpertDto: CreateAppointmentExpertDto, @UploadedFile() file: Express.Multer.File) {
    return this.appointmentService.createExpertAppointment(createAppointmentExpertDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Get('appoint/:id')
  findAll(@Param('id') id: string) {
    return this.appointmentService.findAll(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('expert/appoint/:id')
  findAllForExpert(@Param('id') id: string) {
    return this.appointmentService.findAllForExpert(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('expert/:id')
  findOneForExpert(@Param('id') id: string) {
    return this.appointmentService.findByIdForExpert(id);
  }

  @Get('images/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'images'});
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('rejected/:id')
  rejectedPlanning(@Param('id') id: string) {
    return this.appointmentService.rejectedPlanning(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('accepted/:id')
  acceptedPlanning(@Param('id') id: string) {
    return this.appointmentService.acceptedPlanning(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('confirmed/:id')
  confirmPlanning(@Param('id') id: string) {
    return this.appointmentService.confirmPlanning(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  findByUser(@Param('id') id: string) {
    return this.appointmentService.findByUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('expert/user/:id')
  findByUserForExpert(@Param('id') id: string) {
    return this.appointmentService.findByUserForExpert(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/:range')
  checkIfUserAlreadyBook(@Param('id') id: string, @Param('range') range: string) {
    return this.appointmentService.findIfUserAlreadyBook(id, range);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(id);
  }
}
