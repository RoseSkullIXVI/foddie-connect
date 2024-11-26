import { Test, TestingModule } from '@nestjs/testing';
import { FollowingFollowersService } from './following_followers.service';

describe('FollowingFollowersService', () => {
  let service: FollowingFollowersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FollowingFollowersService],
    }).compile();

    service = module.get<FollowingFollowersService>(FollowingFollowersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
