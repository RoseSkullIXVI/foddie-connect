import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Followers } from 'src/Entities/Followers.entity';
import { Notifications } from 'src/Entities/Notifications.entity';
import { AppUsers } from 'src/Entities/user.entity';
import { NotificationsService } from 'src/notifications/notifications.service';
import { Repository } from 'typeorm';

@Injectable()
export class FollowingFollowersService {
    constructor( @InjectRepository(AppUsers)
    private readonly userRepository: Repository<AppUsers>,
@InjectRepository(Followers) private readonly followRepository : Repository<Followers>, private notif: NotificationsService){}

    async findFollowingSuggestion(phoneNumbers:string[]) :Promise<AppUsers[]>{
        const normalisedContacts = phoneNumbers.map(ph => ph.toLowerCase().trim());

        const potentialFollowers = this.userRepository.createQueryBuilder('user').where('user.PhoneName IN (:...phones)' , {phones: normalisedContacts}).getMany();

        return potentialFollowers;
    }

    async returnFollowing(id:string){
        return await this.followRepository
        .createQueryBuilder('followers')
        .innerJoinAndSelect('followers.following', 'following')
        .where('followers.FollowerID = :userId', { userId: id })
        .getMany();
    }

    async returnFollowers(id:string){
        return await this.followRepository
        .createQueryBuilder('following')
        .innerJoinAndSelect('following.followers', 'follower')
        .where('following.FollowingID = :userId', { userId: id })
        .getMany();
    }

    async followUser(idCombo: any) {
        try {
            // Create and save the follow relationship
            const follow = this.followRepository.create({
                FollowerID: idCombo.UserID,
                FollowingID: idCombo.UserToFollowID,
                FollowAt: new Date(),
            });
            await this.followRepository.save(follow);
    
            // Fetch the necessary users
            const user = await this.userRepository.findOne(idCombo.UserID);
            const followingUser = await this.userRepository.findOne(idCombo.UserToFollowID);
    
            if (!user) {
                throw new NotFoundException('User not found');
            }
            if (!followingUser) {
                throw new NotFoundException('User to follow not found');
            }
            if (!followingUser.NotifToken) {
                console.warn('Following user does not have a notification token');
                return; // Exit gracefully if no token
            }
    
            // Construct the notification message
            const message = `${user.FullName} started following you`;
    
            // Insert notification and send push notification
            await this.notif.insertNotification(idCombo.UserToFollowID, message);
            await this.notif.sendPushNotifcations(message, [followingUser.NotifToken]);
        } catch (error) {
            console.error('Error following user:', error);
            throw new InternalServerErrorException('Failed to follow user');
        }
    }

    async UnfollowUser(idCombo:any){
        const unfollow = this.followRepository.delete({
            FollowerID : idCombo.UserID,
            FollowingID: idCombo.UserToUnfollowID,
        })

    }
}
