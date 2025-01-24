import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (private UsersService:UsersService,private jwtService: JwtService) {}
    async validateUser (email:string , pass:string): Promise<any>{
        const user = await this.UsersService.findOne(email);    
        if(!user){
            return null
        }   
        const isMatch = await bcrypt.compare(pass, user.Password);
        if (user && isMatch){
            const { Password, ...result } = user;
            return result;
        }
        else{
            return null;
        }
    }

    async login (user:any){
        const payload = {email: user.email , sub: user.userID};
        return {
            access_token : this.jwtService.sign(payload, { secret: process.env.JWT_TOKEN  , expiresIn: process.env.TOKEN_SEKUNDE}),
        };
    }

}
