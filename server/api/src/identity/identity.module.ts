import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppInteractionModule } from 'src/app-interaction/app-interaction.module';
import { AuthModule } from 'src/auth/auth.module';
import { CredentialsModule } from 'src/credentials/credentials.module';
import { DIDPublishingModule } from 'src/did-publishing/did-publishing.module';
import { DIDModule } from 'src/did/did.module';
import { IdentityClaimModule } from 'src/identity-claim/identity-claim.module';
import { KeyRingModule } from 'src/key-ring/key-ring.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { ActivityModule } from "../activity/activity.module";
import { IdentityResolver } from './identity.resolver';
import { IdentityService } from './identity.service';

@Module({
  providers: [
    IdentityResolver,
    IdentityService,
  ],
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '10 days' },
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    forwardRef(() => CredentialsModule),
    KeyRingModule,
    DIDModule,
    DIDPublishingModule,
    AuthModule,
    ActivityModule,
    UserModule,
    forwardRef(() => AppInteractionModule),
    IdentityClaimModule
  ],
  exports: [
    IdentityService
  ]
})
export class IdentityModule { }
