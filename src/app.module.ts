import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
//import { JwtGuard } from './Guards/jwt.guard';
import { JwtStrategy } from './auth/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './Database/database.module';
import { EmailsService } from './emails/emails.service';
import { FollowingFollowersModule } from './following_followers/following_followers.module';
import { NotificationsService } from './notifications/notifications.service';
import { NotificationsModule } from './notifications/notifications.module';
import { EmailsModule } from './emails/emails.module';
import { RetaurantModule } from './retaurant/retaurant.module';
import { ReviewService } from './review/review.service';
import { ReviewController } from './review/review.controller';
import { ReviewModule } from './review/review.module';
import * as Joi from "@hapi/joi";


@Module({
  imports: [ConfigModule.forRoot({isGlobal: true,
    validationSchema: Joi.object({
      PGHOST: Joi.string().required(),
      PGUSER: Joi.string().required(),
      PGPASSWORD: Joi.string().required(),
      PGDATABASE: Joi.string().required(),
    })
  },
  ), AuthModule, UsersModule,
    DatabaseModule,
    NotificationsModule,
    FollowingFollowersModule,
    EmailsModule,
    RetaurantModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService,JwtStrategy, EmailsService],
})
export class AppModule {}
