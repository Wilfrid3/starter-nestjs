import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UnityService } from './unity.service';
import { CreateUnityDto } from './dto/create-unity.dto';
import { UpdateUnityDto } from './dto/update-unity.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

@Controller('unity')
export class UnityController {
  constructor(private readonly unityService: UnityService) {}

  @Post()
  create(@Body() createUnityDto: CreateUnityDto) {
    return this.unityService.create(createUnityDto);
  }

  @Get()
  findAll() {
    return this.unityService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unityService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnityDto: UpdateUnityDto) {
    return this.unityService.update(id, updateUnityDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unityService.remove(id);
  }
}
