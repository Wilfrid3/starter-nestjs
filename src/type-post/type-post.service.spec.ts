import { Test, TestingModule } from '@nestjs/testing';
import { TypePostService } from './type-post.service';

describe('TypePostService', () => {
  let service: TypePostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypePostService],
    }).compile();

    service = module.get<TypePostService>(TypePostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
