import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

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
      }),
    }),
  ],
})
export class DatabaseModule {}