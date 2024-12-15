import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/Guards/jwt.guard';
import { ReviewService } from './review.service';
import { Review } from 'src/DTO/Review.dto';

@Controller('review')
export class ReviewController {
    constructor( private review : ReviewService){}


    @UseGuards(JwtGuard)
    @Get('types')
    async types(){
        return this.review.types();
    }


    @UseGuards(JwtGuard)
    @Post('submit')
    async submit(@Body() details : Review){
        return this.review.submitReview(details);
    }


    @UseGuards(JwtGuard)
    @Get('homeFeed/:id')
    async homefeed(@Param('id') id:string){
        return this.review.getFeedWithFollowersReviews(id);
    }


}
