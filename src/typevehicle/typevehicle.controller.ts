import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Res } from '@nestjs/common';
import { TypevehicleService } from './typevehicle.service';
import { CreateTypevehicleDto } from './dto/create-typevehicle.dto';
import { UpdateTypevehicleDto } from './dto/update-typevehicle.dto';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('typevehicle')
export class TypevehicleController {
  constructor(private readonly typevehicleService: TypevehicleService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file',
    {
      storage: diskStorage({
        destination: './images/typevehicles',
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return cb(null, `${randomName}${extname(file.originalname)}`)
        }
      })
    }
  )
  )
  create(@Body() createTypevehicleDto: CreateTypevehicleDto, @UploadedFile() file: Express.Multer.File) {
    return this.typevehicleService.create(createTypevehicleDto, file);
  }

  @Get('image/:fileId')
  async serveImage(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'images/typevehicles' });
  }

  @Get()
  findAll() {
    return this.typevehicleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typevehicleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypevehicleDto: UpdateTypevehicleDto) {
    return this.typevehicleService.update(id, updateTypevehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typevehicleService.remove(id);
  }
}
