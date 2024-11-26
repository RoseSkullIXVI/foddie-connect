import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Followers } from 'src/Entities/Followers.entity';
import { AppUsers } from 'src/Entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FollowingFollowersService {
    constructor( @InjectRepository(AppUsers)
    private readonly userRepository: Repository<AppUsers>,
@InjectRepository(Followers) private readonly followRepository : Repository<Followers>){}

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
}
