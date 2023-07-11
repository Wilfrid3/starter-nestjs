import { Test, TestingModule } from '@nestjs/testing';
import { TypeDataService } from './type-data.service';

describe('TypeDataService', () => {
  let service: TypeDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeDataService],
    }).compile();

    service = module.get<TypeDataService>(TypeDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
