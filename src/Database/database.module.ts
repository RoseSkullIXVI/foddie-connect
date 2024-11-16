import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CredentialsSubscriber } from "src/Subscribers/Credentials.subscriber";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("PGHOST"),
        username: configService.get("PGUSER"),
        password: configService.get("PGPASSWORD"),
        database: configService.get("PGDATABASE"),
        entities: [__dirname + "/../**/*.entity{.ts,.js}"],
        ssl: {
          rejectUnauthorized: false, 
        },
        subscribers: [CredentialsSubscriber],
      }),
    }),
  ],
})
export class DatabaseModule {}