import { Test, TestingModule } from '@nestjs/testing';
import { PlantDiseaseController } from './plant-disease.controller';
import { PlantDiseaseService } from './plant-disease.service';

describe('PlantDiseaseController', () => {
  let controller: PlantDiseaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlantDiseaseController],
      providers: [PlantDiseaseService],
    }).compile();

    controller = module.get<PlantDiseaseController>(PlantDiseaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
