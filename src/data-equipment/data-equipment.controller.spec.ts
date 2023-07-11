import { Test, TestingModule } from '@nestjs/testing';
import { DataEquipmentController } from './data-equipment.controller';
import { DataEquipmentService } from './data-equipment.service';

describe('DataEquipmentController', () => {
  let controller: DataEquipmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataEquipmentController],
      providers: [DataEquipmentService],
    }).compile();

    controller = module.get<DataEquipmentController>(DataEquipmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
