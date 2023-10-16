import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Identity, IdentityClaimRequest, User, UserShadowKeyType } from '@prisma/client/main';
import { CredentialsService } from 'src/credentials/credentials.service';
import { Nonce, SecretBox } from 'src/crypto/secretbox';
import { AppException } from 'src/exceptions/app-exception';
import { IdentityClaimExceptionCode } from 'src/exceptions/exception-codes';
import { IdentityAccessInfo } from 'src/identity/model/identity-access-info';
import { KeyRingService } from 'src/key-ring/key-ring.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { ClaimableIdentity } from './model/claimable-identity';

@Injectable()
export class IdentityClaimService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private credentialsService: CredentialsService,
    private keyRingService: KeyRingService,
    private userService: UserService
  ) { }

  /**
   * From an identity access token received by an application after creating a managed identity,
   * create a claim request that a target user can use through a url in order to acquire ownership
   * on the identity.
   */
  async createClaimRequest(accessInfo: IdentityAccessInfo) {
    const nonce = Nonce.random();
    const encryptedPassword = Buffer.from(SecretBox.encryptWithPassword(accessInfo.password, nonce._bytes())).toString("hex");

    const expire = new Date();
    expire.setMinutes(expire.getMinutes() + 10);

    const claimRequest = await this.prisma.identityClaimRequest.create({
      data: {
        identityDid: accessInfo.identity.did,
        expiresAt: expire,
        password: encryptedPassword
      },
      include: {
        identity: true
      }
    });

    const claimURL = this.getClaimUrl(claimRequest.id, nonce.toString());
    return { claimRequest, claimURL };
  }

  /**
   * Returns the claim url to be used by end users for to reach
   * the claim identity page.
   */
  private getClaimUrl(claimRequestId: string, nonce: string): string {
    return this.config.getOrThrow("FRONTEND_URL") + `/claim-identity?request=${encodeURIComponent(claimRequestId)}` +
      `&nonce=${encodeURIComponent(nonce)}`;
  }

  public async getClaimableIdentityInfo(claimRequest: IdentityClaimRequest & { identity: Identity }): Promise<ClaimableIdentity> {
    return {
      did: claimRequest.identityDid,
      createdAt: claimRequest.createdAt,
      credentialsCount: await this.credentialsService.getCredentialsCount(claimRequest.identityDid),
      creatingAppDid: claimRequest.identity.creatingAppIdentityDid
    };
  }

  public async verifyClaimRequest(claimRequestId: string, nonce: string) {
    const claimRequest = await this.prisma.identityClaimRequest.findFirst({
      where: {
        id: claimRequestId
      },
      include: {
        identity: {
          include: {
            creatingAppIdentity: true
          }
        }
      }
    });

    if (!claimRequest)
      throw new AppException(IdentityClaimExceptionCode.RequestNotExists, "Identity claim request not exists", HttpStatus.NOT_FOUND);

    if (claimRequest.expiresAt < new Date())
      throw new AppException(IdentityClaimExceptionCode.RequestExpired, "Identity claim request expired", HttpStatus.NOT_ACCEPTABLE);

    if (claimRequest.claimCompletedAt)
      throw new AppException(IdentityClaimExceptionCode.AlreadyClaimed, "Identity already claimed", HttpStatus.BAD_REQUEST);

    const n = new Nonce(Buffer.from(nonce, "hex"));
    const encryptedPassword = Buffer.from(claimRequest.password, "hex");

    if (SecretBox.decryptWithPassword(encryptedPassword, n._bytes()) == null)
      throw new AppException(IdentityClaimExceptionCode.InvalidNonce, "Invalid identity claim request", HttpStatus.BAD_REQUEST);

    return claimRequest;
  }

  public async claimManagedIdentity(claimRequestId: string, nonce: string, newPassword: string, browserId: string, user: User) {
    const claimRequest = await this.prisma.identityClaimRequest.findFirst({
      where: {
        id: claimRequestId
      },
      include: {
        identity: {
          include: {
            user: true,
            creatingAppIdentity: true
          }
        }
      }
    });

    if (!claimRequest)
      throw new AppException(IdentityClaimExceptionCode.RequestNotExists, "Identity claim request not exists", HttpStatus.NOT_FOUND);

    if (claimRequest.expiresAt < new Date())
      throw new AppException(IdentityClaimExceptionCode.RequestExpired, "Identity claim request expired", HttpStatus.NOT_ACCEPTABLE);

    if (claimRequest.claimCompletedAt)
      throw new AppException(IdentityClaimExceptionCode.AlreadyClaimed, "Identity already claimed", HttpStatus.BAD_REQUEST);

    const n = new Nonce(Buffer.from(nonce, "hex"));
    const encryptedPassword = Buffer.from(claimRequest.password, "hex");

    const oldPassword = Buffer.from(SecretBox.decryptWithPassword(encryptedPassword, n._bytes())).toString("utf-8");

    const authKey = {
      type: UserShadowKeyType.PASSWORD,
      keyId: claimRequest.identity.user.temporaryEmail,
      key: oldPassword
    }

    const managedMasterKey = await this.keyRingService._decryptMasterKey(authKey,
      claimRequest.identity.creatingAppIdentityDid /* as the browser id */,
      claimRequest.identity.user);

    const currentMasterKey = await this.keyRingService.getMasterKey(user.id, browserId, true);

    await this.userService.transfer(
        claimRequest.id,
        claimRequest.identity.user, managedMasterKey,
        user, currentMasterKey);

    const cliamedIdentity = await this.prisma.identity.findUnique({
      where: {
        did: claimRequest.identity.did
      },
      include: {
        creatingAppIdentity: true
      }
    });

    return cliamedIdentity;
  }
}