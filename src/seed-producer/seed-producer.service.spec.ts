import { Test, TestingModule } from '@nestjs/testing';
import { SeedProducerService } from './seed-producer.service';

describe('SeedProducerService', () => {
  let service: SeedProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeedProducerService],
    }).compile();

    service = module.get<SeedProducerService>(SeedProducerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
