import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AppUsers } from 'src/Entities/user.entity';
import { FollowingFollowersService } from './following_followers.service';
import { JwtGuard } from 'src/Guards/jwt.guard';

@Controller('following-followers')
export class FollowingFollowersController {
    constructor(private readonly following:FollowingFollowersService) {}

    @UseGuards(JwtGuard)
    @Post('potentialFollowers')
    async PotentialFollowers (@Body('contacts') contacts: string[]){
        return this.following.findFollowingSuggestion(contacts);        
    }

    @UseGuards(JwtGuard)
    @Get('returnFollowing/:id')
    async ReturnFollowing(@Param('id') id:string){
        return this.following.returnFollowing(id);
    }
    
    @UseGuards(JwtGuard)
    @Get('returnFollowing/:id')
    async ReturnFollowers(@Param('id') id:string){
        return this.following.returnFollowers(id);
    }
    }