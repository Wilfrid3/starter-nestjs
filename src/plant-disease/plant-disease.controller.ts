import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PlantDiseaseService } from './plant-disease.service';
import { CreatePlantDiseaseDto } from './dto/create-plant-disease.dto';
import { UpdatePlantDiseaseDto } from './dto/update-plant-disease.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('plant-disease')
export class PlantDiseaseController {
  constructor(private readonly plantDiseaseService: PlantDiseaseService) {}

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
  create(@Body() createPlantDiseaseDto: CreatePlantDiseaseDto, @UploadedFile() file: Express.Multer.File) {
    return this.plantDiseaseService.create(createPlantDiseaseDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.plantDiseaseService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plantDiseaseService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
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
  update(@Param('id') id: string, @Body() updatePlantDiseaseDto: UpdatePlantDiseaseDto, @UploadedFile() file: Express.Multer.File) {
    return this.plantDiseaseService.update(id, updatePlantDiseaseDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plantDiseaseService.remove(id);
  }
}
