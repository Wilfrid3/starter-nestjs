import { Test, TestingModule } from '@nestjs/testing';
import { TypePostController } from './type-post.controller';
import { TypePostService } from './type-post.service';

describe('TypePostController', () => {
  let controller: TypePostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypePostController],
      providers: [TypePostService],
    }).compile();

    controller = module.get<TypePostController>(TypePostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
