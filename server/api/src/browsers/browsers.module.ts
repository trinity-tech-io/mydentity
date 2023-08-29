import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BrowsersResolver } from './browsers.resolver';
import { BrowsersService } from './browsers.service';

@Module({
  providers: [
    BrowsersResolver,
    BrowsersService
  ],
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule)
  ],
  exports: [
    BrowsersService
  ]
})
export class BrowsersModule { }
