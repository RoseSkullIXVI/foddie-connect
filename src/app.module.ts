import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './Guards/jwt.guard';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: JwtGuard,
  }, JwtStrategy],
})
export class AppModule {}
