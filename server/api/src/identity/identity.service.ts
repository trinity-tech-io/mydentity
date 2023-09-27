import { DIDDocument, RootIdentity } from '@elastosfoundation/did-js-sdk';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ActivityType, Browser, Identity, IdentityType, User } from '@prisma/client/main';
import { CredentialsService } from 'src/credentials/credentials.service';
import { AssistTransactionStatus, DIDPublishingService } from 'src/did-publishing/did-publishing.service';
import { DidService } from 'src/did/did.service';
import { AppException } from 'src/exceptions/app-exception';
import { AuthExceptionCode, DIDExceptionCode } from 'src/exceptions/exception-codes';
import { KeyRingService } from 'src/key-ring/key-ring.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { uuid } from 'uuidv4';
import { ActivityService } from "../activity/activity.service";
import { AddServiceInput } from './dto/add-service.input';
import { CreateIdentityInput } from './dto/create-identity.input';
import { CreateManagedIdentityInput } from './dto/create-managed-identity.input';
import { RemoveServiceInput } from './dto/remove-service.input';
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
    private keyRingService: KeyRingService,
    private activityService: ActivityService) {
  }

  async create(createIdentityInput: CreateIdentityInput, user: User, browser: Browser): Promise<Identity> {
    const storePassword = this.getDIDStorePassword(user?.id, browser?.id);
    return this.createIdentityInternal(user.id, storePassword, createIdentityInput.identityType, user, createIdentityInput.hiveVaultProvider);
  }

  /**
   * Creates a new orphan identity (no user attached). This is used to easily create identities
   * remotely by third party apps. This returns a token that can be used to manage the identity
   * (ie: transfer to a user during claim).
   *
   * If the token is lost, the identity is orphan forever.
   */
  async createManaged(input: CreateManagedIdentityInput): Promise<Identity> {
    const storePassword = "12345"; // TODO: check with jingyu for master key access from remote management token
    const context = uuid(); // Unique
    return this.createIdentityInternal(context, storePassword);
  }

  /**
  * @param context sandboxing context for DID storage
  */
  private async createIdentityInternal(context: string, storePassword: string, type: IdentityType = IdentityType.REGULAR, user?: User, hiveVaultProvider?: string): Promise<Identity> {
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

    const identityRoot = await this.prisma.identityRoot.create({
      data: {
        ...(user && { user: { connect: { id: user.id } } }),
        didStoreRootIdentityId: rootIdentity.getId()
      }
    });

    const identity = await this.prisma.identity.create({
      data: {
        did: identityDid,
        type, // regular user, or application identity
        identityRoot: { connect: { id: identityRoot.id } },
        derivationIndex: derivationIndex,
        ...(user && { user: { connect: { id: user.id } } }),
        publicationId: "",
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
    this.logger.log("Checking identity publicaiton status for DID " + did);

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

  private getDIDStorePassword(userId: string, browserId: string) {
    return this.keyRingService.getMasterKey(userId, browserId);
  }
}
