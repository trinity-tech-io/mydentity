import { DIDDocument, RootIdentity } from '@elastosfoundation/did-js-sdk';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ActivityType, Browser, Identity, IdentityType, User, UserShadowKeyType } from '@prisma/client/main';
import { AuthService } from 'src/auth/auth.service';
import { CredentialsService } from 'src/credentials/credentials.service';
import { AssistTransactionStatus, DIDPublishingService } from 'src/did-publishing/did-publishing.service';
import { DidService } from 'src/did/did.service';
import { AppException } from 'src/exceptions/app-exception';
import { AuthExceptionCode, DIDExceptionCode } from 'src/exceptions/exception-codes';
import { KeyRingService } from 'src/key-ring/key-ring.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { uuid } from 'uuidv4';
import { ActivityService } from "../activity/activity.service";
import { AddServiceInput } from './dto/add-service.input';
import { CreateIdentityInput } from './dto/create-identity.input';
import { SetCredentialVisibilityInput } from './dto/credential-visibility.input';
import { RemoveServiceInput } from './dto/remove-service.input';
import { ManagedIdentityStatusEntity } from './entities/managed-identity-status.entity';
import { IdentityAccessInfo } from './model/identity-access-info';
import { IdentityAccessTokenPayload } from './model/identity-access-token-payload';
import { IdentityPublicationState } from './model/identity-publication-state';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

@Injectable()
export class IdentityService {
  private logger: Logger = new Logger("IdentityService");

  constructor(private prisma: PrismaService,
    private credentialsService: CredentialsService,
    private didPublishingService: DIDPublishingService,
    private didService: DidService,
    private userService: UserService,
    private authService: AuthService,
    private keyRingService: KeyRingService,
    private jwtService: JwtService,
    private activityService: ActivityService) {
  }

  async create(createIdentityInput: CreateIdentityInput, user: User, browser: Browser): Promise<Identity> {
    const storePassword = this.getDIDStorePassword(user?.id, browser?.id);
    return this.createIdentityInternal(user.id, storePassword, createIdentityInput.identityType, createIdentityInput.rootIdentityId, user, createIdentityInput.hiveVaultProvider);
  }

  /**
  * @param context sandboxing context for DID storage
  */
  private async createIdentityInternal(context: string, storePassword: string, type: IdentityType = IdentityType.REGULAR, rootIdentityId?: string, user?: User, hiveVaultProvider?: string, creatingAppDid?: string): Promise<Identity> {
    let rootIdentity: RootIdentity = null;
    let didDocument: DIDDocument = null;
    let identityDid: string = null;

    try {
      // Get rootIdentity to new did.
      rootIdentity = await this.didService.getRootIdentity(context, storePassword);

      didDocument = await rootIdentity.newDid(storePassword);

      // In order to avoid publishing the DID at creation, then publish again to set the hive provider,
      // we add the hive vault provider as a service, if any given, during the identity creation.
      if (hiveVaultProvider) {
        didDocument = await DIDDocument.Builder.newFromDocument(didDocument)
          .addService("#hivevault", "HiveVault", hiveVaultProvider)
          .seal(storePassword);
      }

      // Save the DID document
      await this.didService.storeDIDDocument(context, didDocument);

      identityDid = didDocument.getSubject().toString();
    } catch (e) {
      this.logger.log(`DID creation exception: ${e}`)
      throw new AppException(DIDExceptionCode.DIDStorageError, e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // One user can create multiple dids, so we save the derivation index.
    const derivationIndex = rootIdentity.getIndex() - 1;
    this.logger.log('Creating DID at index ' + derivationIndex);

    // check the rootIdentityId?
    if (!rootIdentityId && user.defaultRootIdentityId) {
      rootIdentityId = user.defaultRootIdentityId;
    }
    if (!rootIdentityId) {
      const identityRoot = await this.prisma.identityRoot.create({
        data: {
          ...(user && { user: { connect: { id: user.id } } }),
          didStoreRootIdentityId: rootIdentity.getId()
        }
      });

      await this.userService.updateUserDefaultRootIdentityId(user, identityRoot.id);

      rootIdentityId = identityRoot.id;
    }

    const identity = await this.prisma.identity.create({
      data: {
        did: identityDid,
        type, // regular user, or application identity
        identityRoot: { connect: { id: rootIdentityId } },
        derivationIndex: derivationIndex,
        ...(user && { user: { connect: { id: user.id } } }),
        publicationId: "",
        ...(creatingAppDid && { creatingAppIdentity: { connect: { did: creatingAppDid } } })
      }
    })

    // publish DID
    const payload = await this.didService.createDIDPublishTransaction(context, identityDid, storePassword);
    const { publicationId } = await this.publishIdentity(identityDid, payload);
    identity.publicationId = publicationId;

    await this.activityService.createActivity(user, { type: ActivityType.IDENTITY_CREATED, identityId: identity.did, identityDid: identity.did });

    this.logger.log('create identity:' + JSON.stringify(identity));

    return identity;
  }

  async deleteIdentity(didString: string, user: User) {
    this.logger.log('deleteIdentity didString:' + didString);
    const successfulDeletion = await this.didService.deleteIdentity(didString, user.id);
    if (successfulDeletion) {
      await this.credentialsService.deleteIdentityCredentials(didString, user);

      await this.prisma.identity.delete({
        where: {
          did: didString
        }
      });

      await this.activityService.createActivity(user, { type: ActivityType.IDENTITY_DELETED, identityDid: didString });
    } else {
      this.logger.warn('deleteIdentity error');
    }
    return successfulDeletion;
  }

  async createDIDPublishTransaction(didString: string, user: User, browser: Browser) {
    const storePassword = this.getDIDStorePassword(user?.id, browser?.id);

    const payload = await this.didService.createDIDPublishTransaction(user.id, didString, storePassword);
    return {
      payload: payload.toString(),
    }
  }

  /**
   * Posts a publication request and only waits for the post confirmation but not for the DID
   * transaction to be confirmed on chain.
   */
  async publishIdentity(didString: string, payloadObject: any) {
    this.logger.log("Publishing identity:" + didString)

    const publicationId = await this.didPublishingService.publishDID(didString, payloadObject);
    await this.prisma.identity.update({
      where: {
        did: didString
      },
      data: {
        publicationId: publicationId,
        publishedAt: null
      }
    });
    return {
      publicationId: publicationId
    };
  }

  async getPublicationStatus(did: string): Promise<IdentityPublicationState> {
    this.logger.log("Checking identity publication status for DID " + did);

    // Get the publication status from prisma first
    const identity = await this.prisma.identity.findFirst({ where: { did } });

    // No entry found, this is a state error. Return unpublished.
    if (!identity)
      return IdentityPublicationState.UNPUBLISHED;

    // If we know it was already published earlier, we don't check by api, we simply return published
    if (identity.publishedAt) {
      return IdentityPublicationState.PUBLISHED;
    }

    const assistTransactionStatusResponse = await this.didPublishingService.getPublicationStatus(identity.publicationId);
    if (assistTransactionStatusResponse.data.status == AssistTransactionStatus.COMPLETED) {
      // We just found that the publication is complete, so we save this into database for quick access to info later on.
      await this.prisma.identity.update({
        where: {
          did
        },
        data: {
          publishedAt: moment(assistTransactionStatusResponse.data.modified).toDate()
        }
      });

      return IdentityPublicationState.PUBLISHED;
    }
    else {
      return this.assistToIdentityPublicationStatus(assistTransactionStatusResponse.data.status);
    }
  }

  private assistToIdentityPublicationStatus(assistStatus: AssistTransactionStatus): IdentityPublicationState {
    switch (assistStatus) {
      case AssistTransactionStatus.COMPLETED: return IdentityPublicationState.PUBLISHED;
      case AssistTransactionStatus.ERROR: return IdentityPublicationState.FAILED_TO_PUBLISH;
      case AssistTransactionStatus.PENDING: return IdentityPublicationState.PUBLISHING;
      case AssistTransactionStatus.PROCESSING: return IdentityPublicationState.PUBLISHING;
      case AssistTransactionStatus.QUARANTINED: return IdentityPublicationState.FAILED_TO_PUBLISH;
    }
  }

  findAll(user: User) {
    return this.prisma.identity.findMany({
      where: {
        userId: user.id
      }
    })
  }

  // Updates the given identity's last used at date
  async markIdentityInUse(didString: string) {
    await this.prisma.identity.update({
      where: {
        did: didString
      },
      data: {
        lastUsedAt: moment().toDate()
      }
    })

    return true;
  }

  // Add service to didDocument.
  async addService(addServiceInput: AddServiceInput, user: User, browser: Browser) {
    const storePassword = this.getDIDStorePassword(user?.id, browser?.id);

    await this.didService.addService(user.id, addServiceInput.identityDid,
      addServiceInput.serviceId, addServiceInput.type, addServiceInput.endpoint,
      addServiceInput.properties, storePassword);
    return true;
  }

  // Remove service from didDocument.
  async removeService(removeServiceInput: RemoveServiceInput, user: User, browser: Browser) {
    const storePassword = this.getDIDStorePassword(user?.id, browser?.id);

    await this.didService.removeService(user.id, removeServiceInput.identityDid,
      removeServiceInput.serviceId, storePassword);
    return true;
  }

  async getLocalDIDDocument(didString: string, user: User) {
    const didDocument = await this.didService.getDidDocument(user?.id, didString);
    return {
      didDocument: didDocument.toString()
    }
  }

  async setCredentialVisibility(input: SetCredentialVisibilityInput, user: User, browser: Browser) {
    const storePassword = this.getDIDStorePassword(user?.id, browser?.id);

    const credential = await this.credentialsService.findOne(input.credentialId);
    if (!credential)
      throw new AppException(DIDExceptionCode.DIDStorageError, "the credential is not exist", HttpStatus.INTERNAL_SERVER_ERROR);

    if (input.visible) {
      await this.didService.addCredentialToDIDDocument(user?.id, input.identityDid, credential.credentialId, storePassword);
    } else {
      await this.didService.removeCredentialFromDIDDocument(user?.id, input.identityDid, credential.credentialId, storePassword);
    }
    return true;
  }

  async synchronize(user: User, browser: Browser) {
    const storePassword = this.getDIDStorePassword(user?.id, browser?.id);

    await this.didService.synchronize(user?.id, storePassword);
    return true;
  }

  private getDIDStorePassword(userId: string, browserId: string) {
    return this.keyRingService.getMasterKey(userId, browserId);
  }

  /**
   * Creates a new orphan identity (unmanaged user attached). This is used to easily create identities
   * remotely by third party apps. This returns a token that can be used to manage the identity
   * (ie: transfer to a user during claim).
   *
   * If the token is lost, the identity is orphan forever.
   */
  async createManaged(developer: User, appDid: string): Promise<{ identity: Identity, identityAccessToken: string }> {
    // Create a temporary user
    const unmanagedUser = await this.userService.createUnmanagedUser();

    const storePassword = uuid(); // random password that will be stored in the identity token returned to the calling app
    const context = uuid(); // Unique, used for the DID store storage

    // Create a master key and a password based shadow key. This is used when called by the third party app later to encrypt/decrypt DID stored content such as credentials.
    await this.keyRingService.bindKey({
      type: UserShadowKeyType.PASSWORD,
      keyId: "unused-for-password",
      key: storePassword
    }, null, unmanagedUser);

    const identity = await this.createIdentityInternal(context, storePassword, IdentityType.REGULAR, null, unmanagedUser, null, appDid);

    const identityAccessToken = await this.generateIdentityAccessToken(storePassword, identity.did);

    return {
      identity,
      identityAccessToken
    };
  }

  /**
   * Generates an identity access token which contains the random password to
   * decrypt the identity's master key.
   */
  public generateIdentityAccessToken(password: string, identityDID: string): string {
    const payload: IdentityAccessTokenPayload = {
      password,
      identityDID
    };

    return this.jwtService.sign(payload, {
      expiresIn: "3650d", // Long expiration time
    });
  }

  public async getManagedIdentityStatus(identity: Identity): Promise<ManagedIdentityStatusEntity> {
    return {
      // TODO: for now, never claimed
      claimed: false,
      createdAt: identity.createdAt.toISOString(),
      claimedAt: null
    };
  }

  public async validateIdentityAccessToken(identityAccessToken: string): Promise<IdentityAccessInfo> {
    try {
      const decoded: IdentityAccessTokenPayload = await this.jwtService.verifyAsync(identityAccessToken);

      // Look for the identity related to this access token
      const identity = await this.prisma.identity.findUnique({
        where: { did: decoded.identityDID },
        include: {
          user: true
        }
      });
      if (!identity)
        throw new AppException(AuthExceptionCode.IdentityNotOwned, "The identity related to the identity access token doesn't exist", 404);

      return {
        identity,
        password: decoded.password
      };
    }
    catch (e) {
      console.error(e)
      throw new AppException(AuthExceptionCode.WrongAccessToken, "This identity access token is invalid", 401);
    }
  }

  /**
   * Ensures that the identityDid identity is owned by user and returns the identity.
   * If not, throws an exception.
   */
  public async ensureOwnedIdentity(identityDid: string, user: User): Promise<Identity> {
    const identity = await this.prisma.identity.findFirst({
      where: {
        did: identityDid,
        userId: user.id
      }
    })
    if (!identity) {
      this.logger.log('ensureOwnedIdentity identityDid:' + identityDid + ' user.id:' + user.id);
      throw new AppException(AuthExceptionCode.IdentityNotOwned, `You are not owner of identity ${identityDid}`, 401);
    }

    return identity;
  }

  /**
   * Ensures that the appDID identity is:
   * - owned by the developer
   * - is an application DID
   *
   * If not, throws an exception.
   */
  public async ensureOwnedApplicationIdentity(appDid: string, developer: User): Promise<Identity> {
    if (!appDid)
      throw new AppException(AuthExceptionCode.IdentityNotOwned, `This API requires the application DID to be provided.`, 401);

    const identity = await this.prisma.identity.findFirst({
      where: {
        did: appDid,
        type: IdentityType.APPLICATION,
        userId: developer.id
      }
    });

    if (!identity) {
      throw new AppException(AuthExceptionCode.IdentityNotOwned, `The developer access key account and app DID ${appDid} don't match. Make sure your app DID is in the same user account as the one from which you generated the API access key.`, 401);
    }

    return identity;
  }
}
