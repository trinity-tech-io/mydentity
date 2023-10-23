import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { KeyRingModule } from 'src/key-ring/key-ring.module';
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
    forwardRef(() => AuthModule),
    forwardRef(() => KeyRingModule)
  ],
  exports: [
    BrowsersService
  ]
})
export class BrowsersModule { }
