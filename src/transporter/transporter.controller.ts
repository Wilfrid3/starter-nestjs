import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res, UseGuards, UploadedFiles } from '@nestjs/common';
import { TransporterService } from './transporter.service';
import { CreateTransporterDto } from './dto/create-transporter.dto';
import { UpdateTransporterDto } from './dto/update-transporter.dto';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { AssignTransporterDto } from './dto/assign-transporter.dto';

@Controller('transporter')
export class TransporterController {
  constructor(private readonly transporterService: TransporterService) { }

  @Post()
  @UseInterceptors(AnyFilesInterceptor({
    storage: diskStorage({
      destination: './images/transporters',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        return cb(null, `${randomName}${extname(file.originalname)}`)
      },
    })
  }
  )
  )
  create(@Body() createTransporterDto: CreateTransporterDto, @UploadedFiles() files) {
    return this.transporterService.create(createTransporterDto, files);
  }

  @Post('assign')
  assign(@Body() assignTransporterDto: AssignTransporterDto) {
    return this.transporterService.assign(assignTransporterDto);
  }

  @Get()
  findAll() {
    return this.transporterService.findAll();
  }

  @Get('/images/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'images/transporters' });
  }

  @Get('by-agency/:id')
  findByAgency(@Param('id') id: string) {
    return this.transporterService.findByAgency(id);
  }

  @Get('by-user/:id')
  findByUser(@Param('id') id: string) {
    return this.transporterService.findByUser(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transporterService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(AnyFilesInterceptor({
    storage: diskStorage({
      destination: './images/transporters',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        return cb(null, `${randomName}${extname(file.originalname)}`)
      },
    })
  }
  )
  )
  update(@Param('id') id: string, @Body() updateTransporterDto: UpdateTransporterDto, @UploadedFiles() files) {
    return this.transporterService.update(id, updateTransporterDto, files);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transporterService.remove(id);
  }
}
