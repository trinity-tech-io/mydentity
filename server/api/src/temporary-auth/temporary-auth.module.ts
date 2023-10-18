import { Module, forwardRef } from '@nestjs/common';
import { ActivityModule } from 'src/activity/activity.module';
import { BrowsersModule } from 'src/browsers/browsers.module';
import { EmailingModule } from 'src/emailing/emailing.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { TemporaryAuthResolver } from './temporary-auth.resolver';
import { TemporaryAuthService } from './temporary-auth.service';

@Module({
  providers: [
    TemporaryAuthResolver,
    TemporaryAuthService
  ],
  imports: [
    PrismaModule,
    forwardRef(() => UserModule),
    forwardRef(() => EmailingModule),
    forwardRef(() => BrowsersModule),
    forwardRef(() => ActivityModule)
  ],
  exports: [
    TemporaryAuthService
  ]
})
export class TemporaryAuthModule { }
