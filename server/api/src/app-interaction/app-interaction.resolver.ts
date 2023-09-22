import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Browser, Credential, User } from '@prisma/client/main';
import { CurrentUser } from 'src/auth/currentuser.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentBrowser } from 'src/browsers/browser-user.decorator';
import { CredentialsService } from 'src/credentials/credentials.service';
import { CredentialEntity } from 'src/credentials/entities/credential.entity';
import { IdentityService } from 'src/identity/identity.service';
import { mapAsync } from 'src/utils/map-async';
import { RecordRequestedCredentialsInput } from './dto/record-requested-credentials.input';
import { IdentityInteractingApplicationEntity } from './entities/identity-interacting-application.entity';
import { RequestedCredentialEntity } from './entities/requested-credential.entity';
import { InteractingApplicationsService } from './interacting-applications.service';

@Resolver(() => IdentityInteractingApplicationEntity)
export class AppInteractionResolver {
  constructor(
    private interactingApplicationsService: InteractingApplicationsService,
    private identityService: IdentityService,
    private credentialsService: CredentialsService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async recordRequestedCredentials(@Args('input') input: RecordRequestedCredentialsInput, @CurrentUser() user: User) {
    // Make sure credentials are owned by the user
    const credentials: Credential[] = [];
    for (const credId of input.credentialIds) {
      credentials.push(await this.credentialsService.ensureOwnedCredential(credId, user));
    }

    return this.interactingApplicationsService.recordRequestedCredentials(input.applicationDid, credentials);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [RequestedCredentialEntity])
  async requestedCredentials(@Args('identityInteractingAppId') identityInteractingAppId: string, @CurrentUser() user: User, @CurrentBrowser() browser: Browser) {
    const requestedCredentials = await this.interactingApplicationsService.findRequestedCredentials(identityInteractingAppId);

    const results = await mapAsync(requestedCredentials, async (rc) => {
      return {
        ...rc,
        credential: await this.credentialsService.credentialWithStringVC(rc.credential, user, browser)
      }
    });

    // Filter null, in case for some reason the real VC could not be loaded
    return results.filter(c => !!c?.credential);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [CredentialEntity])
  async importedCredentials(@Args('identityInteractingAppId') identityInteractingAppId: string, @CurrentUser() user: User, @CurrentBrowser() browser: Browser) {
    const importedCredentials = await this.interactingApplicationsService.findImportedCredentials(identityInteractingAppId);

    const results = await mapAsync(importedCredentials, async (c) => {
      return this.credentialsService.credentialWithStringVC(c, user, browser)
    });

    // Filter null, in case for some reason the real VC could not be loaded
    return results.filter(c => !!c);
  }

  /* @UseGuards(JwtAuthGuard)
  @Mutation(() => IdentityInteractingApplicationEntity)
  createAppInteraction(@Args('input') input: CreateAppInteractionInput, @CurrentUser() user: User) {
    return this.interactingApplicationsService.upsertIdentityInteractingApplication(input);
  } */

  @UseGuards(JwtAuthGuard)
  @Query(() => [IdentityInteractingApplicationEntity], { name: 'interactingApplications' })
  async findAllInteractingApplications(@Args('identityDid', { nullable: true }) identityId: string = null, @CurrentUser() user: User) {
    if (identityId)
      await this.identityService.ensureOwnedIdentity(identityId, user);
    return this.interactingApplicationsService.findIdentityInteractingApplications(identityId, user);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [IdentityInteractingApplicationEntity], { name: 'interactingApplicationsForCredential' })
  async findAllInteractingApplicationsForCredential(@Args('credentialId') credentialId: string, @CurrentUser() user: User) {
    await this.credentialsService.ensureOwnedCredential(credentialId, user);
    return this.interactingApplicationsService.findIdentityInteractingApplicationsForCredential(credentialId);
  }
}
