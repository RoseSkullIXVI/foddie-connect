import { Module } from '@nestjs/common';
import { RetaurantController } from './retaurant.controller';
import { RetaurantService } from './retaurant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppUsersRestaurantLikesBridge } from 'src/Entities/AppUsersRestaurantLikesBridge.entity';
import { ReviewTypeOfReviewBridge } from 'src/Entities/ReviewTypeOfReviewBridge.entity';
import { TypeOfCuisine } from 'src/Entities/TypeOfCuisine.entity';
import { RestaurantTypeOfCuisineBridge } from 'src/Entities/RestaurantTypeOfCuisineBridge.entity';
import { Restaurant } from 'src/Entities/Restaurant.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports :[TypeOrmModule.forFeature([AppUsersRestaurantLikesBridge,ReviewTypeOfReviewBridge,TypeOfCuisine,RestaurantTypeOfCuisineBridge,Restaurant]), JwtModule.register({
      secret: process.env.JWT_TOKEN,
      signOptions : {expiresIn: process.env.TOKEN_SEKUNDE}
    })],
  controllers: [RetaurantController],
  providers: [RetaurantService]
})
export class RetaurantModule {}
