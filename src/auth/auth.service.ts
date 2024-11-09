import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (private UsersService:UsersService,private jwtService: JwtService) {}
    async validateUser (username:string , pass:string): Promise<any>{
        const user = await this.UsersService.findOne(username);        
        const isMatch = await bcrypt.compare(pass, user.password);
        if (user && user.password === pass){
            const { password, ...result } = user;
            return result;
        }
        else{
            return null;
        }
    }

    async login (user:any){
        const payload = {username: user.username , sub: user.userID};
        return {
            access_token : this.jwtService.sign(payload, { secret: process.env.JWT_TOKEN  , expiresIn: process.env.TOKEN_SEKUNDE}),
        };
    }

}
