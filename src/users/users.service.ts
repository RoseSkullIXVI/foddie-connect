import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from 'src/DTO/RegistrationUser.dto';
import { Credentials } from 'src/Entities/credentials.entity';
import { AppUsers } from 'src/Entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

    constructor (@InjectRepository(AppUsers) private readonly appUserRepository : Repository<AppUsers>,
                  @InjectRepository(Credentials) private readonly credentialsRepository: Repository<Credentials>,
                  private jwtService: JwtService) {}

    async registerUser (registerUser : RegisterUserDto ): Promise< {access_token : string}> {
      const {fullname , username , email, password } = registerUser;
      const existingUser = await this.credentialsRepository.findOne({where : [{Username: username},{Email:email}]})
      if (existingUser) {
        throw new BadRequestException('Username or email already taken');
      }
      const appUser = this.appUserRepository.create({FullName:fullname});
      const savedUser = await this.appUserRepository.save(appUser);

      const credentials = this.credentialsRepository.create({
        Username : username,
        Email : email,
        Password: password,
        UserID : savedUser.AppUserId
      })

      await this.credentialsRepository.save(credentials);

      return {
        access_token : this.jwtService.sign({Username : credentials.Username , UserID: credentials.UserID}, { secret: process.env.JWT_TOKEN  , expiresIn: process.env.TOKEN_SEKUNDE}),
    };

      
    }


      async findOne(userName: string): Promise<Credentials> {
        return this.credentialsRepository.findOne({where : [{Username: userName}]})
      }
}
