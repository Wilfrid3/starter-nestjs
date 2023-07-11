import { Test, TestingModule } from '@nestjs/testing';
import { PlantDiseaseService } from './plant-disease.service';

describe('PlantDiseaseService', () => {
  let service: PlantDiseaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlantDiseaseService],
    }).compile();

    service = module.get<PlantDiseaseService>(PlantDiseaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
