import { Test, TestingModule } from '@nestjs/testing';
import { TypeDataController } from './type-data.controller';
import { TypeDataService } from './type-data.service';

describe('TypeDataController', () => {
  let controller: TypeDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeDataController],
      providers: [TypeDataService],
    }).compile();

    controller = module.get<TypeDataController>(TypeDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
