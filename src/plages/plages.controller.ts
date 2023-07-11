import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PlagesService } from './plages.service';
import { CreatePlageDto } from './dto/create-plage.dto';
import { UpdatePlageDto } from './dto/update-plage.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

@Controller('ranges')
export class PlagesController {
  constructor(private readonly plagesService: PlagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPlageDto: CreatePlageDto) {
    return this.plagesService.create(createPlageDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.plagesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('planning/:id')
  findByPlanning(@Param('id') id: string) {
    return this.plagesService.findByPlanning(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('planning-user/:id')
  findAllRangesByUser(@Param('id') id: string) {
    return this.plagesService.findAllRanges(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.plagesService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlageDto: UpdatePlageDto) {
    return this.plagesService.update(id, updatePlageDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plagesService.remove(id);
  }
}
