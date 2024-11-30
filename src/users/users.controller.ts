import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/Guards/jwt.guard';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    @Post('forgotPassword')
    async forgot_Password (@Body('email') email:string) : Promise <{message: string}>{
        return this.userService.forgotPassword(email);
    }

    @Post('resetPassword')
    async reset_password (@Body('token') token:string , @Body('newPassword') newPass : string) : Promise <{message: string}>{
        return this.userService.resetPassword(token , newPass);
    }

    @UseGuards(JwtGuard)
    @Get('getprofile/:id')
    async returnProfile(@Param('id') id:string){
        return this.userService.returnProfile(id);
    }

    @UseGuards(JwtGuard)
    @Post ('/storeTokenNotif')
    async storeUserTokenNotif(@Body() data:any){
        return this.userService.storeUserTokenNotif(data);
    }
}
