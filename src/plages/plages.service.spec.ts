import { Test, TestingModule } from '@nestjs/testing';
import { PlagesService } from './plages.service';

describe('PlagesService', () => {
  let service: PlagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlagesService],
    }).compile();

    service = module.get<PlagesService>(PlagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
