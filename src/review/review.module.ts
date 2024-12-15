import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOfReview } from 'src/Entities/TypeOfReview.entity';
import { Review } from 'src/Entities/Review.entity';
import { ReviewTypeOfReviewBridge } from 'src/Entities/ReviewTypeOfReviewBridge.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports :[TypeOrmModule.forFeature([TypeOfReview,Review,ReviewTypeOfReviewBridge]), JwtModule.register({
      secret: process.env.JWT_TOKEN,
      signOptions : {expiresIn: process.env.TOKEN_SEKUNDE}
    })],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule {}
