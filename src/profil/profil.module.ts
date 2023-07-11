import { Module } from '@nestjs/common';
import { ProfilService } from './profil.service';
import { ProfilController } from './profil.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Profil, ProfilSchema } from 'src/profil/schema/profil.schema';
import { PerimissionModule } from 'src/perimission/perimission.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Profil.name, schema: ProfilSchema }]),
    PerimissionModule,
  ],
  controllers: [ProfilController],
  providers: [ProfilService],
  exports: [ProfilService]
})
export class ProfilModule {}
