import { Module } from '@nestjs/common';
import { ActivityResolver } from './activity.resolver';
import { ActivityService } from './activity.service';
import { PrismaModule } from "../prisma/prisma.module";
import { UserModule } from "../user/user.module";

@Module({
  providers: [ActivityResolver, ActivityService],
  imports: [PrismaModule,
    UserModule,
  ],
  exports: [
    ActivityService
  ]
})
export class ActivityModule {}
