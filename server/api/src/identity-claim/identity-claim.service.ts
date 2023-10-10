import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Identity, IdentityClaimRequest } from '@prisma/client/main';
import { CredentialsService } from 'src/credentials/credentials.service';
import { IdentityAccessInfo } from 'src/identity/model/identity-access-info';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClaimableIdentity } from './model/claimable-identity';

@Injectable()
export class IdentityClaimService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private credentialsService: CredentialsService
  ) { }

  /**
   * From an identity access token received by an application after creating a managed identity,
   * create a claim request that a target user can use through a url in order to acquire ownership
   * on the identity.
   */
  async createClaimRequest(accessInfo: IdentityAccessInfo) {
    const claimRequest = await this.prisma.identityClaimRequest.create({
      data: {
        identityDid: accessInfo.identity.did
      },
      include: {
        identity: true
      }
    });

    return claimRequest;
  }

  findOne(id: string) {
    return this.prisma.identityClaimRequest.findFirst({
      where: { id },
      include: {
        identity: {
          include: {
            creatingAppIdentity: true
          }
        }
      }
    });
  }

  /**
   * Returns the claim url to be used by end users for to reach
   * the claim identity page.
   */
  public getClaimUrl(claimRequestId: string): string {
    return this.config.getOrThrow("FRONTEND_URL") + `/claim-identity?request=${encodeURIComponent(claimRequestId)}`;
  }

  public async getClaimableIdentityInfo(claimRequest: IdentityClaimRequest & { identity: Identity }): Promise<ClaimableIdentity> {
    return {
      did: claimRequest.identityDid,
      createdAt: claimRequest.createdAt,
      credentialsCount: await this.credentialsService.getCredentialsCount(claimRequest.identityDid),
      creatingAppDid: claimRequest.identity.creatingAppIdentityDid
    };
  }
}
