import { Test, TestingModule } from '@nestjs/testing';
import { TypevehicleController } from './typevehicle.controller';
import { TypevehicleService } from './typevehicle.service';

describe('TypevehicleController', () => {
  let controller: TypevehicleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypevehicleController],
      providers: [TypevehicleService],
    }).compile();

    controller = module.get<TypevehicleController>(TypevehicleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
