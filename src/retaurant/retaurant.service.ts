import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantLike } from 'src/DTO/RestaurantLike.dto';
import { AppUsersRestaurantLikesBridge } from 'src/Entities/AppUsersRestaurantLikesBridge.entity';
import { Followers } from 'src/Entities/Followers.entity';
import { Restaurant } from 'src/Entities/Restaurant.entity';
import { RestaurantTypeOfCuisineBridge } from 'src/Entities/RestaurantTypeOfCuisineBridge.entity';
import { ReviewTypeOfReviewBridge } from 'src/Entities/ReviewTypeOfReviewBridge.entity';
import { TypeOfCuisine } from 'src/Entities/TypeOfCuisine.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RetaurantService {

    constructor(@InjectRepository(AppUsersRestaurantLikesBridge) private readonly likesBridge : Repository<AppUsersRestaurantLikesBridge>,
                @InjectRepository(ReviewTypeOfReviewBridge)private readonly reviewBridge : Repository<ReviewTypeOfReviewBridge>,
                @InjectRepository(Restaurant)private readonly resto : Repository<Restaurant>,
            @InjectRepository(RestaurantTypeOfCuisineBridge) private readonly resto_types : Repository<RestaurantTypeOfCuisineBridge>,
        @InjectRepository(TypeOfCuisine) private readonly types : Repository<TypeOfCuisine>){}

    getLikes(name:string , AppUserID:string){ // dame na kamo na ferni ta likes ton filon kai OXI OLON
         return this.likesBridge.createQueryBuilder('bridge')
        .leftJoinAndSelect('bridge.user' , 'user')
        .leftJoinAndSelect('bridge.restaurant', 'restaurant')
        .leftJoinAndSelect(Followers , 'followers' , 'followers.FollowingID = user.AppUserID')
        .select('user.ProfilePicture' , 'ProfilePicture')
        .addSelect('user.AppUserID' , 'UserID')
        .where('restaurant.Name =:name' , {name: name})
        .andWhere('followers.FollowerID =:UserID' , {UserID : AppUserID})
        .getRawMany();
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

    async restaurantLike(details:RestaurantLike): Promise<string>{
        const existingResto = await this.resto.findOne({where : {Name : details.name}})

        if (existingResto){
            existingResto.NumOfLike += 1 ;            
           await this.resto.save(existingResto)

           await this.likesBridge.save({
                AppUserID : details.AppUserID,
                RestaurantID : existingResto.RestaurantID
            })
        }else{
            const restoInsertResult = await this.resto.createQueryBuilder('resto')
            .insert().into(Restaurant).values([{
                Location : details.location,
                Name : details.name,
                NumOfLike : 1
            }]).returning("RestaurantID").execute();

            const restoId = restoInsertResult.generatedMaps[0].RestaurantID;

            for (const element of details.categories) {
                const CuisineType = await this.types.findOneBy({ Type: element });
                await this.resto_types.save({
                    CuisineID: CuisineType.CuisineID,
                    RestaurantID: restoId.generatedMaps[0].RestaurantID, // Extract the returned ID
                });
            }
            
            this.likesBridge.save({
                AppUserID : details.AppUserID,
                RestaurantID : restoId
            })

        }

        return "Success";
    }
}