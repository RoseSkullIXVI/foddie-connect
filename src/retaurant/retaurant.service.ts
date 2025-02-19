import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { promises } from 'dns';
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

    getLikes(name:string , AppUserID:string){ 
         return this.likesBridge.createQueryBuilder('bridge')
        .leftJoinAndSelect('bridge.user' , 'user')
        .leftJoinAndSelect('bridge.restaurant', 'restaurant')
        .leftJoinAndSelect(Followers , 'followers' , 'followers.FollowingID = user.AppUserID')
        .select('user.ProfilePicture' , 'ProfilePicture')
        .addSelect('user.AppUserID' , 'UserID')
        .addSelect('user.FullName' , 'Fname')
        .where('restaurant.Name =:name' , {name: name})
        .andWhere('followers.FollowerID =:UserID' , {UserID : AppUserID})
        .getRawMany();
    }

    getReview(name:string){
        return this.reviewBridge.createQueryBuilder('bridge')
        .leftJoinAndSelect('bridge.review' , 'review')
        .leftJoinAndSelect('bridge.typeofreview' , 'typeofreview')
        .leftJoinAndSelect('review.restaurant', 'restaurant')
        .select('typeofreview.Description' , 'desc')
        .addSelect('typeofreview.Type' , 'type')
        .where('restaurant.Name =:name' , {name: name})
        .getMany();
    }

    getRestaurant(name:string){
        return this.resto.find({where : {Name : name}});
    }

    async getTopRestaurant(): Promise<Restaurant[]>{
        return this.resto.find({
            order : {NumOfLike : 'DESC'},
            take : 10
        });
    }

    async getUsersRestaurant(UserID : string){ 
       const results = await this.likesBridge.createQueryBuilder('bridge')
    .leftJoinAndSelect('bridge.user', 'user')
    .leftJoinAndSelect('bridge.restaurant', 'restaurant')
    .leftJoinAndSelect('restaurant.cuisineBridge', 'cuisineBridge') 
    .leftJoinAndSelect('cuisineBridge.cuisine', 'cuisine') 
    .where('bridge.AppUserID = :userID', { userID: UserID })
    .getMany();

     console.log("Cuisines" , results.map(re => re.restaurant.cuisineBridge.map(c => c.cuisine.Type)))
    // return results;
    return results.map(result => ({
        AppUserID: result.AppUserID,
        RestaurantID: result.RestaurantID,
        restaurant: {
            Email: result.restaurant.Email,
            Location: result.restaurant.Location,
            Name: result.restaurant.Name,
            NumOfLike: result.restaurant.NumOfLike,
            Phone: result.restaurant.Phone,
            Picture: result.restaurant.Picture,
            RestaurantID: result.restaurant.RestaurantID,
            Cuisines: result.restaurant.cuisineBridge.map(c => c.cuisine.Type)
        },
        user: result.user
    }));

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

    async restaurantUnlike(details: any): Promise<string> {
        // Find the restaurant by its name
        const existingResto = await this.resto.findOne({ where: { Name: details.name } });
    
        if (!existingResto) {
            throw new BadRequestException('Restaurant does not exist');
        }
    
        // Check if there is a relationship between the user and the restaurant
        const restUserRelationship = await this.likesBridge.findOne({
            where: { AppUserID: parseInt(details.AppUserID), RestaurantID: existingResto.RestaurantID },
        });
    
        if (!restUserRelationship) {
            throw new BadRequestException('User has not liked this restaurant');
        }
    
        // Decrement the like count only if it's greater than 0
        if (existingResto.NumOfLike > 0) {
            existingResto.NumOfLike -= 1;
            await this.resto.save(existingResto);
        }
    
        // Remove the relationship between the user and the restaurant
        await this.likesBridge.delete({ AppUserID: parseInt(details.AppUserID), RestaurantID: existingResto.RestaurantID });
    
        return 'Success';
    }

   
    
}