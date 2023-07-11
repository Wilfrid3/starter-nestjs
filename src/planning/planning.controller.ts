import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PlanningService } from './planning.service';
import { CreatePlanningDto } from './dto/create-planning.dto';
import { UpdatePlanningDto } from './dto/update-planning.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

@Controller('planning')
export class PlanningController {
  constructor(private readonly planningService: PlanningService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPlanningDto: CreatePlanningDto) {
    return this.planningService.create(createPlanningDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.planningService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('fetch-my-planning/:id')
  findMyPlanning(@Param('id') id: string) {
    return this.planningService.findMyPlanning(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planningService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  findByUser(@Param('id') id: string) {
    return this.planningService.findByUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanningDto: UpdatePlanningDto) {
    return this.planningService.update(id, updatePlanningDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planningService.remove(id);
  }
}
