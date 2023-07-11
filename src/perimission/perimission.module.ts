import { Module } from '@nestjs/common';
import { PerimissionService } from './perimission.service';
import { PerimissionController } from './perimission.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Permission, PermissionSchema } from 'src/perimission/schema/permission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Permission.name, schema: PermissionSchema }]),
  ],
  controllers: [PerimissionController],
  providers: [PerimissionService],
  exports: [PerimissionService]
})
export class PerimissionModule {}
