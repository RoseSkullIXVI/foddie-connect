import { Controller,Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/DTO/RegistrationUser.dto';
import { UsersService } from 'src/users/users.service';


@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService , private userService: UsersService){}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req){
        return this.authService.login(req.user);
    }

    @Post('register')
    async register (@Body() registerUserDto: RegisterUserDto): Promise <{access_token:string}> {
        return this.userService.registerUser(registerUserDto);
    }
}
