import { Module } from '@nestjs/common';
import { FollowingFollowersService } from './following_followers.service';
import { FollowingFollowersController } from './following_followers.controller';

@Module({
  providers: [FollowingFollowersService],
  controllers: [FollowingFollowersController]
})
export class FollowingFollowersModule {}
