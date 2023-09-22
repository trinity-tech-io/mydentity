import { Module } from '@nestjs/common';
import { ActivityResolver } from './activity.resolver';
import { ActivityService } from './activity.service';
import { PrismaModule } from "../prisma/prisma.module";
import { UserModule } from "../user/user.module";
import { ActivityWsGateway } from "./activity.ws.gateway";
import { CommonWsModule } from "../websockets/ws.module";

@Module({
  providers: [ActivityResolver,
    ActivityService,
    ActivityWsGateway
  ],
  imports: [PrismaModule,
    UserModule,
    CommonWsModule
  ],
  exports: [
    ActivityService
  ]
})

export class ActivityModule {}