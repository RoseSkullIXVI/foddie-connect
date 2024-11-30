import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notifications } from 'src/Entities/Notifications.entity';
import { AppUsersNotificationsBridge } from 'src/Entities/AppUsersNotificationsBridge.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Notifications,AppUsersNotificationsBridge])],
    providers:[NotificationsService],
    exports : [NotificationsService]
})
export class NotificationsModule {}
