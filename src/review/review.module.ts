import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOfReview } from 'src/Entities/TypeOfReview.entity';

@Module({
  imports :[TypeOrmModule.forFeature([TypeOfReview])],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule {}
