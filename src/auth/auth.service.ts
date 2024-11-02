import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor (private UsersService:UsersService) {}
    async validateUser (username:string , pass:string): Promise<any>{
        const user = await this.UsersService.findOne(username);        
        const isMatch = await bcrypt.compare(pass, user.password);
        if (user && isMatch){
            const { password, ...result } = user;
            return result;
        }
        else{
            return null;
        }
    }

}
