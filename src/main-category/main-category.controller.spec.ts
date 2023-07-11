import { Test, TestingModule } from '@nestjs/testing';
import { MainCategoryController } from './main-category.controller';
import { MainCategoryService } from './main-category.service';

describe('MainCategoryController', () => {
  let controller: MainCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MainCategoryController],
      providers: [MainCategoryService],
    }).compile();

    controller = module.get<MainCategoryController>(MainCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
