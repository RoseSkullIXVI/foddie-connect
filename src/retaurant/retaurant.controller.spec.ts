import { Test, TestingModule } from '@nestjs/testing';
import { RetaurantController } from './retaurant.controller';

describe('RetaurantController', () => {
  let controller: RetaurantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RetaurantController],
    }).compile();

    controller = module.get<RetaurantController>(RetaurantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
