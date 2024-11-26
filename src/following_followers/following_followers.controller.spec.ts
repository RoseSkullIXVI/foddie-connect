import { Test, TestingModule } from '@nestjs/testing';
import { FollowingFollowersController } from './following_followers.controller';

describe('FollowingFollowersController', () => {
  let controller: FollowingFollowersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FollowingFollowersController],
    }).compile();

    controller = module.get<FollowingFollowersController>(FollowingFollowersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
