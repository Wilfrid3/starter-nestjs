import { Test, TestingModule } from '@nestjs/testing';
import { AgroExpertController } from './agro-expert.controller';
import { AgroExpertService } from './agro-expert.service';

describe('AgroExpertController', () => {
  let controller: AgroExpertController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgroExpertController],
      providers: [AgroExpertService],
    }).compile();

    controller = module.get<AgroExpertController>(AgroExpertController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
