import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { WebSocketService } from './ws.service';
import { WebSocketCacheService } from "./ws-cache.service";
import { CacheModule } from "@nestjs/cache-manager";

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '10 days' },
      }),
      inject: [ConfigService],
      imports: [
        ConfigModule
      ]
    }),
    PrismaModule,
    CacheModule.register(),
  ],
  providers: [
    WebSocketService,
    WebSocketCacheService,
  ],
  exports: [
    WebSocketService,
    // WebSocketCacheService
  ],
})
export class CommonWsModule { }
