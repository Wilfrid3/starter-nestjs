import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res, UploadedFiles } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { diskStorage } from 'multer';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor({
    storage: diskStorage({
      destination: './images/vehicles',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        return cb(null, `${randomName}${extname(file.originalname)}`)
      },
    })
  }
  )
  )
  create(@Body() createVehicleDto: CreateVehicleDto, @UploadedFiles() files) {
    return this.vehicleService.create(createVehicleDto, files);
  }

  @Get()
  findAll() {
    return this.vehicleService.findAll();
  }

  @Get('image/:fileId')
  async serveImage(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'images/vehicles' });
  }

  @Get('by-user/:id')
  findByUser(@Param('id') id: string) {
    return this.vehicleService.findByUser(id);
  }

  @Get('by-user-all/:id')
  findByUserAll(@Param('id') id: string) {
    return this.vehicleService.findByUserAll(id);
  }

  @Get('by-type/:id')
  findByType(@Param('id') id: string) {
    return this.vehicleService.findByType(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicleService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(AnyFilesInterceptor({
    storage: diskStorage({
      destination: './images/vehicles',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        return cb(null, `${randomName}${extname(file.originalname)}`)
      },
    })
  }
  )
  )
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto, @UploadedFiles() files) {
    return this.vehicleService.update(id, updateVehicleDto, files);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleService.remove(id);
  }
}
