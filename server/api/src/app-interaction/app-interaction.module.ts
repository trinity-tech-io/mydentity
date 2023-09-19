import { Module, forwardRef } from '@nestjs/common';
import { CredentialsModule } from 'src/credentials/credentials.module';
import { IdentityModule } from 'src/identity/identity.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AppInteractionResolver } from './app-interaction.resolver';
import { InteractingApplicationsService } from './interacting-applications.service';

@Module({
  providers: [
    AppInteractionResolver,
    InteractingApplicationsService
  ],
  exports: [
    InteractingApplicationsService
  ],
  imports: [
    forwardRef(() => IdentityModule),
    forwardRef(() => CredentialsModule),
    PrismaModule
  ]
})
export class AppInteractionModule { }
