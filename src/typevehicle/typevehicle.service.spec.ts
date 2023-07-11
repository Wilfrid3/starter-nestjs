import { Test, TestingModule } from '@nestjs/testing';
import { TypevehicleService } from './typevehicle.service';

describe('TypevehicleService', () => {
  let service: TypevehicleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypevehicleService],
    }).compile();

    service = module.get<TypevehicleService>(TypevehicleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
