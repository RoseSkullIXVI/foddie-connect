import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { AppUsers } from './user.entity';
import { Notifications } from './Notifications.entity';

@Entity()
export class AppUsersNotificationsBridge {
  @PrimaryColumn()
  AppUserID: number;

  @PrimaryColumn()
  NotificationID: number;

  @ManyToOne(() => AppUsers)
  @JoinColumn({ name: 'AppUserID' })
  user: AppUsers;

  @ManyToOne(() => Notifications)
  @JoinColumn({ name: 'NotificationID' })
  notification: Notifications;
}
