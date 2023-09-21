import { forwardRef, Module } from '@nestjs/common';
import { KeyRingResolver } from './key-ring.resolver';
import { KeyRingService } from './key-ring.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { ActivityModule } from "../activity/activity.module";

@Module({
  providers: [
    KeyRingResolver,
    KeyRingService
  ],
  imports: [
    PrismaModule,
    AuthModule,
    forwardRef(() => ActivityModule)
  ],
  exports: [
    KeyRingService
  ]
})
export class KeyRingModule { }
