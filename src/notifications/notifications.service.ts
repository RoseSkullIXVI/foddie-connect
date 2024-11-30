import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expo } from 'expo-server-sdk';
import { AppUsersNotificationsBridge } from 'src/Entities/AppUsersNotificationsBridge.entity';
import { Notifications } from 'src/Entities/Notifications.entity';
import { Repository } from 'typeorm';


@Injectable()
export class NotificationsService {
  constructor(@InjectRepository(Notifications) private readonly notif : Repository<Notifications>,
  @InjectRepository(AppUsersNotificationsBridge) private readonly notifBridge : Repository<AppUsersNotificationsBridge>){}
    private expo = new Expo();

    async sendPushNotifcations(message:string , Tokens: string[] ){
        let messages = [];
        for (let pushToken of Tokens) {
            if (!Expo.isExpoPushToken(pushToken)) {
              console.error(`Push token ${pushToken} is not a valid Expo push token`);
              continue;
            }
            messages.push({
              to: pushToken,
              sound: 'default',
              body: message,
            })
          }

        let chunks = this.expo.chunkPushNotifications(messages);
        let tickets = [];
        for (let chunk of chunks) {
            try {
              let ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
              console.log(ticketChunk);
              tickets.push(...ticketChunk);
            } catch (error) {
              console.error(error);
            }
        }
        return tickets;    
      }

      async insertNotification(UserID:number , message:string){
        const notifications = await this.notif.create({
          Content : message,
          Type : 'Follow'
        })
        this.notif.save(notifications);
        
       const bridge =  await this.notifBridge.create({
          AppUserID : UserID,
          NotificationID : notifications.NotificationsID
        })

        this.notifBridge.save(bridge);        
      }


}
