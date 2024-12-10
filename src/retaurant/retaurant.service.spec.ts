import { Test, TestingModule } from '@nestjs/testing';
import { RetaurantService } from './retaurant.service';

describe('RetaurantService', () => {
  let service: RetaurantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RetaurantService],
    }).compile();

    service = module.get<RetaurantService>(RetaurantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
