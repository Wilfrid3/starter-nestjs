import { Test, TestingModule } from '@nestjs/testing';
import { AgroExpertService } from './agro-expert.service';

describe('AgroExpertService', () => {
  let service: AgroExpertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgroExpertService],
    }).compile();

    service = module.get<AgroExpertService>(AgroExpertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
