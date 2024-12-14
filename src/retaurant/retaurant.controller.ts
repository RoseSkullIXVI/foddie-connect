import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/Guards/jwt.guard';
import { RetaurantService } from './retaurant.service';
import { RestaurantLike } from 'src/DTO/RestaurantLike.dto';

@Controller('retaurant')
export class RetaurantController {
    constructor(private readonly restaurant: RetaurantService){}


    @UseGuards(JwtGuard)
    @Get('getRestaurantLikes/:name/:AppUserID')
    getRestaurantLikes(@Param('name') name:string , @Param('AppUserID') AppUserID:string){
        return this.restaurant.getLikes(name,AppUserID);
    }


    @UseGuards(JwtGuard)
    @Get('getRestaurantReviews/:name')
    getRestaurantReviews(@Param('name') name:string){
        return this.restaurant.getReview(name);
    }


    @UseGuards(JwtGuard)
    @Get('getRestaurant/:name')
    getRestaurant(@Param('name') name:string){
        return this.restaurant.getRestaurant(name);
    }

    @UseGuards(JwtGuard)
    @Get('getTopRestaurant')
    getTopRestaurant(){
        return this.restaurant.getTopRestaurant();
    }

   
    
    @UseGuards(JwtGuard)
    @Post('setRestauranLike')
    async restaurantLike(@Body() details : RestaurantLike):Promise <string>{
        return this.restaurant.restaurantLike(details);
    }


    @UseGuards(JwtGuard)
    @Post('removeRestauranLike')
    async restaurantUnlike(@Body() details):Promise <string>{
        return this.restaurant.restaurantUnlike(details);
    }

    

    
}
