import { Test, TestingModule } from '@nestjs/testing';
import { PerimissionController } from './perimission.controller';
import { PerimissionService } from './perimission.service';

describe('PerimissionController', () => {
  let controller: PerimissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerimissionController],
      providers: [PerimissionService],
    }).compile();

    controller = module.get<PerimissionController>(PerimissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
