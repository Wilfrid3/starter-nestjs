import { Test, TestingModule } from '@nestjs/testing';
import { TypequipmentsController } from './typequipments.controller';
import { TypequipmentsService } from './typequipments.service';

describe('TypequipmentsController', () => {
  let controller: TypequipmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypequipmentsController],
      providers: [TypequipmentsService],
    }).compile();

    controller = module.get<TypequipmentsController>(TypequipmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
