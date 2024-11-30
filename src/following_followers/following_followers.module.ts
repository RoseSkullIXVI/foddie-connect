import { Module } from '@nestjs/common';
import { FollowingFollowersService } from './following_followers.service';
import { FollowingFollowersController } from './following_followers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppUsers } from 'src/Entities/user.entity';
import { Followers } from 'src/Entities/Followers.entity';
import { NotificationsService } from 'src/notifications/notifications.service';
import { Notifications } from 'src/Entities/Notifications.entity';
import { AppUsersNotificationsBridge } from 'src/Entities/AppUsersNotificationsBridge.entity';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AppUsers,Followers,Notifications,AppUsersNotificationsBridge]), NotificationsModule// Import repositories
  ],
  providers: [FollowingFollowersService],
  controllers: [FollowingFollowersController]
})
export class FollowingFollowersModule {}
