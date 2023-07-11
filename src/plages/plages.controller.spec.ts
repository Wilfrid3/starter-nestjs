import { Test, TestingModule } from '@nestjs/testing';
import { PlagesController } from './plages.controller';
import { PlagesService } from './plages.service';

describe('PlagesController', () => {
  let controller: PlagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlagesController],
      providers: [PlagesService],
    }).compile();

    controller = module.get<PlagesController>(PlagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
