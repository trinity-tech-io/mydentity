import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ActivityModule } from "../activity/activity.module";
import { KeyRingResolver } from './key-ring.resolver';
import { KeyRingService } from './key-ring.service';

@Module({
  providers: [
    KeyRingResolver,
    KeyRingService
  ],
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule),
    forwardRef(() => ActivityModule)
  ],
  exports: [
    KeyRingService
  ]
})
export class KeyRingModule { }
