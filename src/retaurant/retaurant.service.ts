import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppUsersRestaurantLikesBridge } from 'src/Entities/AppUsersRestaurantLikesBridge.entity';
import { Restaurant } from 'src/Entities/Restaurant.entity';
import { ReviewTypeOfReviewBridge } from 'src/Entities/ReviewTypeOfReviewBridge.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RetaurantService {

    constructor(@InjectRepository(AppUsersRestaurantLikesBridge) private readonly likesBridge : Repository<AppUsersRestaurantLikesBridge>,
                @InjectRepository(ReviewTypeOfReviewBridge)private readonly reviewBridge : Repository<ReviewTypeOfReviewBridge>){}

    getLikes(name:string){
         return this.likesBridge.createQueryBuilder('bridge')
        .leftJoinAndSelect('bridge.user' , 'user')
        .leftJoinAndSelect('bridge.restaurant', 'restaurant')
        .select('user.ProfilePicture' , 'ProfilePicture')
        .where('restaurant.Name =:name' , {name: name})
        .getMany();
    }

    getReview(name:string){
        const resutls = this.reviewBridge.createQueryBuilder('bridge')
        .leftJoinAndSelect('bridge.review' , 'review')
        .leftJoinAndSelect('bridge.typeofreview' , 'typeofreview')
        .leftJoinAndSelect('review.restaurant', 'restaurant')
        .select('typeofreview.Description' , 'desc')
        .addSelect('typeofreview.Type' , 'type')
        .where('restaurant.Name =:name' , {name: name})
        .getMany();


    }
}