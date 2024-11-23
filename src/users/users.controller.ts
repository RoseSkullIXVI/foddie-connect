import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

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
}
