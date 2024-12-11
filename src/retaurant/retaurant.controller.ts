import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/Guards/jwt.guard';
import { RetaurantService } from './retaurant.service';
import { RestaurantLike } from 'src/DTO/RestaurantLike.dto';

@Controller('retaurant')
export class RetaurantController {
    constructor(private readonly restaurant: RetaurantService){}


    @UseGuards(JwtGuard)
    @Get('getRestaurantLikes/:name')
    getRestaurantLikes(@Param('name') name:string){
        return this.restaurant.getLikes(name);
    }


    @UseGuards(JwtGuard)
    @Get('getRestaurantReviews/:name')
    getRestaurantReviews(@Param('name') name:string){
        return this.restaurant.getReview(name);
    }

   
    
    @UseGuards(JwtGuard)
    @Post('getRestaurantReviews')
    async restaurantLike(@Body() details : RestaurantLike):Promise <string>{
        return this.restaurant.restaurantLike(details);
    }

    

    
}
