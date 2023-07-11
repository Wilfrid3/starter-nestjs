import { Test, TestingModule } from '@nestjs/testing';
import { PlantTypeController } from './plant-type.controller';
import { PlantTypeService } from './plant-type.service';

describe('PlantTypeController', () => {
  let controller: PlantTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlantTypeController],
      providers: [PlantTypeService],
    }).compile();

    controller = module.get<PlantTypeController>(PlantTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
