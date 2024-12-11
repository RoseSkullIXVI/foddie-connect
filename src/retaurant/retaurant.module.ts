import { Module } from '@nestjs/common';
import { RetaurantController } from './retaurant.controller';
import { RetaurantService } from './retaurant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppUsersRestaurantLikesBridge } from 'src/Entities/AppUsersRestaurantLikesBridge.entity';
import { ReviewTypeOfReviewBridge } from 'src/Entities/ReviewTypeOfReviewBridge.entity';
import { TypeOfCuisine } from 'src/Entities/TypeOfCuisine.entity';
import { RestaurantTypeOfCuisineBridge } from 'src/Entities/RestaurantTypeOfCuisineBridge.entity';
import { Restaurant } from 'src/Entities/Restaurant.entity';

@Module({
  imports :[TypeOrmModule.forFeature([AppUsersRestaurantLikesBridge,ReviewTypeOfReviewBridge,TypeOfCuisine,RestaurantTypeOfCuisineBridge,Restaurant])],
  controllers: [RetaurantController],
  providers: [RetaurantService]
})
export class RetaurantModule {}
