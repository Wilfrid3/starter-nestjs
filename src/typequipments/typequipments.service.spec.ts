import { Test, TestingModule } from '@nestjs/testing';
import { TypequipmentsService } from './typequipments.service';

describe('TypequipmentsService', () => {
  let service: TypequipmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypequipmentsService],
    }).compile();

    service = module.get<TypequipmentsService>(TypequipmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
