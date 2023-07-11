import { Test, TestingModule } from '@nestjs/testing';
import { SeedProducerController } from './seed-producer.controller';
import { SeedProducerService } from './seed-producer.service';

describe('SeedProducerController', () => {
  let controller: SeedProducerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeedProducerController],
      providers: [SeedProducerService],
    }).compile();

    controller = module.get<SeedProducerController>(SeedProducerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
