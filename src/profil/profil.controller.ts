import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProfilService } from './profil.service';
import { CreateProfilDto } from './dto/create-profil.dto';
import { UpdateProfilDto } from './dto/update-profil.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

@Controller('profil')
export class ProfilController {
  constructor(private readonly profilService: ProfilService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProfilDto: CreateProfilDto) {
    return this.profilService.create(createProfilDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.profilService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfilDto: UpdateProfilDto) {
    return this.profilService.update(id, updateProfilDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profilService.remove(id);
  }
}
