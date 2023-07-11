import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PlantTypeService } from './plant-type.service';
import { CreatePlantTypeDto } from './dto/create-plant-type.dto';
import { UpdatePlantTypeDto } from './dto/update-plant-type.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

@Controller('plant-type')
export class PlantTypeController {
  constructor(private readonly plantTypeService: PlantTypeService) {}

  @Post()
  create(@Body() createPlantTypeDto: CreatePlantTypeDto) {
    return this.plantTypeService.create(createPlantTypeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.plantTypeService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plantTypeService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlantTypeDto: UpdatePlantTypeDto) {
    return this.plantTypeService.update(id, updatePlantTypeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plantTypeService.remove(id);
  }
}
