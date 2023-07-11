import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { CreateSensorKalioDto } from './dto/create-sensor-kalio.dto';

@Controller('sensor')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @Post()
  create(@Body() createSensorDto: CreateSensorDto) {
    return this.sensorService.create(createSensorDto);
  }

  @Post('kalio')
  createKalio(@Body() createSensorDto: CreateSensorKalioDto) {
    return this.sensorService.createForKalio(createSensorDto);
  }

  @Get()
  findAll() {
    return this.sensorService.findAll();
  }

  @Get("by-device/:id")
  findByDevice(@Param('id') id: string) {
    return this.sensorService.findByDevice(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sensorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSensorDto: UpdateSensorDto) {
    return this.sensorService.update(id, updateSensorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sensorService.remove(id);
  }
}
