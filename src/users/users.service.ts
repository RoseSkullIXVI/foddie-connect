import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from 'src/DTO/RegistrationUser.dto';
import { Credentials } from 'src/Entities/credentials.entity';
import { AppUsers } from 'src/Entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { EmailsService } from 'src/emails/emails.service';
import * as bcrypt from 'bcrypt';
import { AppUsersTypeOfFoodBridge } from 'src/Entities/AppUsersTypeOfFoodBridge.entity';
import Expo from 'expo-server-sdk';

@Injectable()
export class UsersService {

    constructor (@InjectRepository(AppUsers) private readonly appUserRepository : Repository<AppUsers>,
                  @InjectRepository(Credentials) private readonly credentialsRepository: Repository<Credentials>,
                  private jwtService: JwtService , private emailService : EmailsService, 
                @InjectRepository(AppUsersTypeOfFoodBridge) private readonly appUserFood : Repository<AppUsersTypeOfFoodBridge>) {}
                private expo = new Expo();

    async registerUser (registerUser : RegisterUserDto ): Promise< {access_token : string}> {
      const {fullname , username , email, password } = registerUser;
      const existingUser = await this.credentialsRepository.findOne({where : [{Username: username},{Email:email}]})
      if (existingUser) {
        throw new BadRequestException('Username already taken');
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


      async findOne(email: string): Promise<Credentials> {
        return this.credentialsRepository.findOne({where : [{Email: email}]})
      }

      async forgotPassword (email:string):Promise<{message:string}>{
        const user = await this.credentialsRepository.findOne({where : [{Email: email}]})
        if (!user){
          throw new BadRequestException("No account found");
        }

        const resetToken = randomBytes(32).toString("hex");
        const resetTokenExpiry = new Date();
        resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1 );

       user.resetToken = resetToken;
       user.resetTokenExpiry = resetTokenExpiry
        this.credentialsRepository.save(user);

        // const resetLink = '${process.env.CLIENT_APP}/reset-password?token=${resetToken}';
         const resetLink = `${process.env.CLIENT_APP}/index`;
        await this.emailService.sendResetPasswordEmail(resetLink , user.Email);

        return { message: 'Password reset instructions sent to your email.' };
      }

      async resetPassword(token: string, newPass: string): Promise<{ message: string; }> {
        const user = await this.credentialsRepository.findOne({where : [{resetToken: token}]});

        if (!user || user.resetTokenExpiry < new Date()) {
          throw new BadRequestException('Invalid or expired reset token.');
      }

      const salt = await bcrypt.genSalt();
      const hashedPass = await bcrypt.hash(newPass,salt);

      user.Password = hashedPass;
      user.salt = salt;
      user.resetToken = null;
      user.resetTokenExpiry = null;
      await this.credentialsRepository.save(user);

      return { message: 'Password successfully updated.' };
    }

    async returnProfile(id:string){
      const profile = await this.appUserFood.createQueryBuilder('bridge')
      .innerJoinAndSelect('bridge.food', 'food') 
      .innerJoinAndSelect('bridge.user', 'user') 
      .where('bridge.AppUserID = :userId', { userId: id })
      .getMany();
  
  if (profile.length === 0) {
      // Handle case where no data is found
      const userData = await this.appUserRepository.findOne({ where: { AppUserId: parseInt(id) } });
      return userData;
  }
  
  return profile;
    }

    async storeUserTokenNotif(Data:any){
      const user = await this.appUserRepository.findOne(Data.userId);

      if (!user){
        throw new NotFoundException("User not found");
      }

      if (!Data.token || !Expo.isExpoPushToken(Data.token)) {
        throw new BadRequestException('Invalid or missing notification token');
    }

      user.NotifToken = Data.token;
      await this.appUserRepository.save(user);
      return {success: true};
    }
}
