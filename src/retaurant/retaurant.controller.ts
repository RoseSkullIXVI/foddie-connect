import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/Guards/jwt.guard';
import { RetaurantService } from './retaurant.service';

@Controller('retaurant')
export class RetaurantController {
    constructor(private readonly restaurant: RetaurantService){}


    @UseGuards(JwtGuard)
    @Get('getRestaurantLikes/:name')
    async returnProfile(@Param('name') name:string){
        return this.restaurant.getLikes(name);
    }
    
}
