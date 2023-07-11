import { Test, TestingModule } from '@nestjs/testing';
import { PerimissionService } from './perimission.service';

describe('PerimissionService', () => {
  let service: PerimissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerimissionService],
    }).compile();

    service = module.get<PerimissionService>(PerimissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
