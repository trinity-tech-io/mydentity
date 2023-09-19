import { Injectable } from '@nestjs/common';
import { Credential, IdentityInteractingApplication, InteractingApplication, RequestedCredential, User } from '@prisma/client/main';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InteractingApplicationsService {
  constructor(private prisma: PrismaService) { }

  public async findRequestedCredentials(identityInteractingAppId: string): Promise<(RequestedCredential & { credential: Credential })[]> {
    return this.prisma.requestedCredential.findMany({
      where: {
        interactingApplicationId: identityInteractingAppId
      },
      include: {
        credential: true
      }
    });
  }

  public async findImportedCredentials(identityInteractingAppId: string): Promise<Credential[]> {
    return this.prisma.credential.findMany({
      where: {
        importedById: identityInteractingAppId
      }
    });
  }

  public async recordRequestedCredentials(applicationDid: string, credentials: Credential[]): Promise<boolean> {
    for (const credential of credentials) {
      await this.upsertRequestedCredential(applicationDid, credential);
    }
    return true;
  }

  private async upsertRequestedCredential(applicationDid: string, credential: Credential) {
    // Make sure the related app did / identity did mapping exists
    const identityInteractingApplication = await this.upsertIdentityInteractingApplication(credential.identityDid, applicationDid);

    // Upsert the requested credential info
    await this.prisma.requestedCredential.upsert({
      where: {
        credentialId_interactingApplicationId: {
          credentialId: credential.id,
          interactingApplicationId: identityInteractingApplication.id
        }
      },
      create: {
        credentialId: credential.id,
        interactingApplicationId: identityInteractingApplication.id
      },
      update: {}
    });
  }

  public getOrCreateIdentityInteractionApplicationByDid(identityDid: string, applicationDid: string): Promise<IdentityInteractingApplication> {
    return this.upsertIdentityInteractingApplication(identityDid, applicationDid);
  }

  private async upsertIdentityInteractingApplication(identityDid: string, applicationDid: string) {
    const interactionApplication = await this.upsertInteractingApplication(applicationDid);

    return this.prisma.identityInteractingApplication.upsert({
      where: {
        identityDid_interactingApplicationId: {
          identityDid,
          interactingApplicationId: interactionApplication.id
        }
      },
      create: {
        identityDid,
        interactingApplicationId: interactionApplication.id
      },
      update: {}
    });
  }

  /**
   * If not existing yet, create an interacting application entry (shared by all users/identities).
   */
  private async upsertInteractingApplication(applicationDid: string): Promise<InteractingApplication> {
    return this.prisma.interactingApplication.upsert({
      where: { did: applicationDid },
      create: { did: applicationDid },
      update: {}
    })
  }

  public async findIdentityInteractingApplications(identityDid: string = null, user: User) {
    return this.prisma.identityInteractingApplication.findMany({
      where: {
        ...(identityDid && { identityDid }),
        identity: {
          userId: user.id
        }
      },
      include: {
        interactingApplication: true
      }
    });
  }

  public async findIdentityInteractingApplicationsForCredential(credentialId: string) {
    return this.prisma.identityInteractingApplication.findMany({
      where: {
        RequestedCredential: {
          some: {
            credentialId
          }
        },
      },
      include: {
        interactingApplication: true
      }
    });
  }
}
