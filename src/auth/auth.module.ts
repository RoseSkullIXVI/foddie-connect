import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [UsersModule,PassportModule , JwtModule.register({
    secret: process.env.JWT_TOKEN,
    signOptions : {expiresIn: parseInt(process.env.TOKEN_SEKUNDE)}
  })],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
