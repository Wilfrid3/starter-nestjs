import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { DataEquipmentService } from './data-equipment.service';
import { CreateDataEquipmentDto } from './dto/create-data-equipment.dto';
import { PostDeviceData } from './dto/post-device-data.dto';
import { UpdateDataEquipmentDto } from './dto/update-data-equipment.dto';

@Controller('data-equipment')
export class DataEquipmentController {
  constructor(private readonly dataEquipmentService: DataEquipmentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createDataEquipmentDto: CreateDataEquipmentDto) {
    return this.dataEquipmentService.create(createDataEquipmentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.dataEquipmentService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('graph/:id/:start/:end')
  requestGraphData(@Param('id') id: string, @Param('start') start: string, @Param('end') end: string) {
    return this.dataEquipmentService.requestGraphData(id, start, end);
  }

  @UseGuards(JwtAuthGuard)
  @Get('average/:id')
  findAverageBySensor(@Param('id') id: string) {
    return this.dataEquipmentService.findAverageBySensor(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('equipment/:id')
  findByEquipment(@Param('id') id: string) {
    return this.dataEquipmentService.findByEquipment(id);
  }

  @Post('post')
  postDeviceData(@Body() postDeviceData: PostDeviceData) {
    return this.dataEquipmentService.postDeviceData(postDeviceData);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.dataEquipmentService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDataEquipmentDto: UpdateDataEquipmentDto) {
    return this.dataEquipmentService.update(id, updateDataEquipmentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataEquipmentService.remove(id);
  }
}
