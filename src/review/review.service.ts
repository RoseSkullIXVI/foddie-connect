import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/DTO/Review.dto';
import { ReviewTypeOfReviewBridge } from 'src/Entities/ReviewTypeOfReviewBridge.entity';
import { TypeOfReview } from 'src/Entities/TypeOfReview.entity';
import {Review as rev}  from 'src/Entities/Review.entity'
import { In, Repository } from 'typeorm';

@Injectable()
export class ReviewService {
    constructor(@InjectRepository(TypeOfReview) private readonly reviewType: Repository<TypeOfReview>,
                @InjectRepository(rev) private readonly review: Repository<rev>,
                @InjectRepository(ReviewTypeOfReviewBridge) private readonly reviewBridge : Repository<ReviewTypeOfReviewBridge>) {}


   async types() :Promise<TypeOfReview[]>{
        return this.reviewType.find();
    }

    async submitReview (review : Review) {
        const setReview = await this.review.create({
            AppUserID: review.AppUserID,
            RestaurantID : review.RestaurantID,
            ReviewDate : review.ReviewDate
        });
        const saveReview = await this.review.save(setReview);

        for (const element of review.ReviewTypes) {
            await this.reviewBridge.save({
                ReviewID : saveReview.ReviewID,
                ReviewTypeID : element
            })
        }
        
        return "Success-Submit";
    }

    async getFeedWithFollowersReviews(userID: string) { 
        return this.review.createQueryBuilder('review')
            .innerJoinAndSelect('review.restaurant', 'restaurant')
            .innerJoin('Followers', 'followers', 'followers.FollowingID = review.AppUserID') 
            .innerJoin('Review_TypeOfReview_Bridge', 'bridge', 'bridge.ReviewID = review.ReviewID') 
            .innerJoin('TypeOfReview', 'typeofreview', 'bridge.ReviewTypeID = typeofreview.ReviewTypeID') 
            .innerJoin('AppUsers', 'user', 'user.AppUserID = review.AppUserID') 
            .where('followers.FollowerID = :userID', { userID })
            .select([
                'restaurant.RestaurantID',
                'restaurant.Name',
                'restaurant.Location',
                'review.ReviewID',
                'review.ReviewDate',
                'typeofreview.Description AS ReviewDescription', 
                'user.FullName AS FollowerName', 
                'user.ProfilePicture AS FollowerProfilePicture' 
            ])
            .getRawMany();
    }
    
}
