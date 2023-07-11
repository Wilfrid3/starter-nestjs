import { Test, TestingModule } from '@nestjs/testing';
import { DataEquipmentService } from './data-equipment.service';

describe('DataEquipmentService', () => {
  let service: DataEquipmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataEquipmentService],
    }).compile();

    service = module.get<DataEquipmentService>(DataEquipmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
