import { DIDDocument, RootIdentity } from '@elastosfoundation/did-js-sdk';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ActivityType, Browser, Identity, IdentityType, User, UserShadowKeyType } from '@prisma/client/main';
import { InteractingApplicationsService } from 'src/app-interaction/interacting-applications.service';
import { AuthService } from 'src/auth/auth.service';
import { CredentialsService } from 'src/credentials/credentials.service';
import { AssistTransactionStatus, DIDPublishingService } from 'src/did-publishing/did-publishing.service';
import { DidService } from 'src/did/did.service';
import { AppException } from 'src/exceptions/app-exception';
import { AuthExceptionCode, DIDExceptionCode } from 'src/exceptions/exception-codes';
import { IdentityClaimService } from 'src/identity-claim/identity-claim.service';
import { IdentityRootService } from 'src/identity-root/identity-root.service';
import { AuthKeyInput } from 'src/key-ring/dto/auth-key-input';
import { KeyRingService } from 'src/key-ring/key-ring.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { uuid } from 'uuidv4';
import { ActivityService } from "../activity/activity.service";
import { AddServiceInput } from './dto/add-service.input';
import { CreateIdentityInput } from './dto/create-identity.input';
import { SetCredentialVisibilityInput } from './dto/credential-visibility.input';
import { ImportIdentityInput } from './dto/import-identity.input';
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
    private interactingApplicationsService: InteractingApplicationsService,
    private identityClaimService: IdentityClaimService,
    private identityRootService: IdentityRootService,
    private didService: DidService,
    private userService: UserService,
    private authService: AuthService,
    private keyRingService: KeyRingService,
    private jwtService: JwtService,
    private activityService: ActivityService) {
  }

  public async createFromAPIInput(createIdentityInput: CreateIdentityInput, user: User, browser: Browser): Promise<Identity> {
    const storePassword = this.getDIDStorePassword(user?.id, browser?.id);
    return this.createIdentity(user, storePassword, createIdentityInput.identityType, createIdentityInput.rootIdentityId, createIdentityInput.hiveVaultProvider, null, createIdentityInput.publish);
  }

  /**
  * @param context sandboxing context for DID storage
  */
  public async createIdentity(user: User, storePassword: string, type: IdentityType = IdentityType.REGULAR, identityRootId: string | null, hiveVaultProvider?: string, creatingAppDid?: string, publish = true): Promise<Identity> {
    const context = user.id;
    let didStoreRootIdentity: RootIdentity = null;
    let didDocument: DIDDocument = null;
    let identityDid: string = null;

    try {
      // Get the main root identity if existing, otherwise create one
      const defaultIdentityRoot = await this.identityRootService.findOne(user.defaultRootIdentityId);
      didStoreRootIdentity = await this.didService.getOrCreateDefaultRootIdentity(context, defaultIdentityRoot?.didStoreRootIdentityId, storePassword);

      didDocument = await didStoreRootIdentity.newDid(storePassword);

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
    const derivationIndex = didStoreRootIdentity.getIndex() - 1;
    this.logger.log('Creating DID at index ' + derivationIndex);

    // If no root identity id is provider but the user has a default root identity, then we user the default root identity
    if (!identityRootId && user.defaultRootIdentityId)
      identityRootId = user.defaultRootIdentityId;

    // If there is no known root identity, we create one and mark it as default for the user.
    if (!identityRootId) {
      const identityRoot = await this.prisma.identityRoot.create({
        data: {
          ...(user && { user: { connect: { id: user.id } } }),
          didStoreRootIdentityId: didStoreRootIdentity.getId()
        }
      });

      await this.userService.updateUserDefaultRootIdentityId(user, identityRoot.id);

      identityRootId = identityRoot.id;
    }

    const identity = await this.prisma.identity.create({
      data: {
        did: identityDid,
        type, // regular user, or application identity
        identityRoot: { connect: { id: identityRootId } },
        derivationIndex: derivationIndex,
        ...(user && { user: { connect: { id: user.id } } }),
        publicationId: "",
        ...(creatingAppDid && { creatingAppIdentity: { connect: { did: creatingAppDid } } })
      }
    })

    if (publish) {
      // Publish the related DID
      const payload = await this.didService.createDIDPublishTransaction(context, identityDid, storePassword);
      const { publicationId } = await this.publishIdentity(identityDid, payload);
      identity.publicationId = publicationId;
    }

    await this.activityService.createActivity(user, { type: ActivityType.IDENTITY_CREATED, identityId: identity.did, identityDid: identity.did });

    this.logger.log('Created identity:' + JSON.stringify(identity));

    return identity;
  }

  async import(input: ImportIdentityInput, user: User, browser: Browser): Promise<Identity[]> {
    const storePassword = this.getDIDStorePassword(user?.id, browser?.id);
    return this.importIdentityInternal(user.id, storePassword, input.identityType, user, input.mnemonic, browser);
  }

  private async importIdentityInternal(context: string, storePassword: string, type: IdentityType = IdentityType.REGULAR, user: User, mnemonic: string, browser: Browser): Promise<Identity[]> {
    try {
      this.logger.log("Importing identities from mnemonic");

      // Create the new root identity. If already exists, an exception is thrown by the method call
      // because we can't import the same mnemonic twice.
      const identityRoot = await this.identityRootService.createFromMnemonic(user, storePassword, mnemonic);

      // Ask our the identity root service to synchronize chain content into the local DID store.
      await this.synchronize(user, browser);

      // Compare and upsert DIDs and VCs
      const { created } = await this.identityRootService.synchronizeDIDStoreToDatabase(user, browser, identityRoot);

      // Save some activity info
      for (const createdIdentity of created) {
        // TOOD: We could save as "imported" instead of "created"
        await this.activityService.createActivity(user, { type: ActivityType.IDENTITY_CREATED, identityId: createdIdentity.did, identityDid: createdIdentity.did });
      }

      this.logger.log('Imported identities:' + JSON.stringify(created));

      return created;
    } catch (e) {
      this.logger.error(`Identity import exception: ${e}`)
      if (!(e instanceof AppException))
        throw new AppException(DIDExceptionCode.DIDStorageError, e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      else
        throw e;
    }
  }

  async deleteIdentity(didString: string, user: User) {
    this.logger.log('deleteIdentity didString:' + didString);

    // Delete the DID store content
    await this.didService.deleteIdentity(didString, user.id);

    // Now delete the identity and all its dependency from the main database.
    // NOTE: we do not check if the DID store deletion succeed, because we can't do this
    // transactionally anyway, and we don't want the main DB identity deletion to be stuck forever
    // in case the DID store failed to delete something.

    // Delete related claim requests
    await this.identityClaimService.deleteIdentityClaimRequests(didString);

    // Delete all credentials
    await this.credentialsService.deleteIdentityCredentials(didString, user);

    // Delete interacting applications
    await this.interactingApplicationsService.deleteIdentityInteractions(didString);

    // Delete the identity itself
    await this.prisma.identity.delete({ where: { did: didString } });

    // Create a user activity to remember this activity was deleted
    await this.activityService.createActivity(user, { type: ActivityType.IDENTITY_DELETED, identityDid: didString });

    return true;
  }

  async createDIDPublishTransaction(didString: string, user: User, browser: Browser) {
    const storePassword = this.getDIDStorePassword(user?.id, browser?.id);

    return await this.didService.createDIDPublishTransaction(user.id, didString, storePassword);
  }

  /**
   * Posts a publication request and only waits for the post confirmation but not for the DID
   * transaction to be confirmed on chain.
   */
  async publishIdentity(didString: string, payload: string | any) {
    this.logger.log("Publishing identity:" + didString)

    const publicationId = await this.didPublishingService.publishDID(didString, payload);
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
      default: return IdentityPublicationState.FAILED_TO_PUBLISH;
    }
  }

  findOne(did: string) {
    return this.prisma.identity.findFirst({ where: { did } });
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

    const identityPassword = uuid(); // random password that will be stored in the identity token returned to the calling app

    // Create a master key and a password based shadow key. This is used when called by the third party app later to encrypt/decrypt DID stored content such as credentials.
    const authKeyInput: AuthKeyInput = {
      type: UserShadowKeyType.PASSWORD,
      keyId: "unused-for-password",
      key: identityPassword
    };
    await this.keyRingService.bindKey(authKeyInput, null, unmanagedUser);

    await this.keyRingService.unlockMasterKey(authKeyInput, null, unmanagedUser);
    const masterKey = this.keyRingService.getMasterKey(unmanagedUser.id, null, true);

    const identity = await this.createIdentity(unmanagedUser, masterKey, IdentityType.REGULAR, null, null, appDid);

    const identityAccessToken = await this.generateIdentityAccessToken(identityPassword, identity.did);

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
