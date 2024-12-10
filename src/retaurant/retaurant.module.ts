import { Module } from '@nestjs/common';
import { RetaurantController } from './retaurant.controller';
import { RetaurantService } from './retaurant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppUsersRestaurantLikesBridge } from 'src/Entities/AppUsersRestaurantLikesBridge.entity';
import { ReviewTypeOfReviewBridge } from 'src/Entities/ReviewTypeOfReviewBridge.entity';

@Module({
  imports :[TypeOrmModule.forFeature([AppUsersRestaurantLikesBridge,ReviewTypeOfReviewBridge])],
  controllers: [RetaurantController],
  providers: [RetaurantService]
})
export class RetaurantModule {}
