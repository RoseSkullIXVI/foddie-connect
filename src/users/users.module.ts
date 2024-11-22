import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppUsers } from 'src/Entities/user.entity';
import { Credentials } from 'src/Entities/credentials.entity';
import { CredentialsSubscriber } from 'src/Subscribers/Credentials.subscriber';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users.controller';

@Module({
  imports :[TypeOrmModule.forFeature([AppUsers, Credentials]), JwtModule.register({
    secret: process.env.JWT_TOKEN,
    signOptions : {expiresIn: process.env.TOKEN_SEKUNDE}
  })],
  providers: [UsersService,CredentialsSubscriber],
  exports:[UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
