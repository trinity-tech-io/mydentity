import { DIDDocument, RootIdentity } from '@elastosfoundation/did-js-sdk';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Identity, User } from '@prisma/client';
import { CredentialsService } from 'src/credentials/credentials.service';
import { AssistTransactionStatus, DIDPublishingService } from 'src/did-publishing/did-publishing.service';
import { DidService } from 'src/did/did.service';
import { AppException } from 'src/exceptions/app-exception';
import { AuthExceptionCode, DIDExceptionCode } from 'src/exceptions/exception-codes';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIdentityInput } from './dto/create-identity.input';
import { IdentityPublicationState } from './model/identity-publication-state';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

@Injectable()
export class IdentityService {
  private logger: Logger = new Logger("IdentityService");

  constructor(private prisma: PrismaService,
    private credentialsService: CredentialsService,
    private didPublishingService: DIDPublishingService,
    private didService: DidService) {
  }

  async create(createIdentityInput: CreateIdentityInput, user: User): Promise<Identity> {
    this.logger.log('create');
    const storePassword = '123456'; // TODO: use account key

    let rootIdentity: RootIdentity = null;
    let didDocument: DIDDocument = null;
    let identityDid: string = null;

    try {
      // Get rootIdentity to new did.
      rootIdentity = await this.didService.getRootIdentity(user.id, storePassword);

      didDocument = await rootIdentity.newDid(storePassword);

      // In order to avoid publishing the DID at creation, then publish again to set the hive provider,
      // we add the hive vault provider as a service, if any given, during the identity creation.
      if (createIdentityInput.hiveVaultProvider)
        didDocument = await DIDDocument.Builder.newFromDocument(didDocument)
          .addService("#hivevault", "HiveVault", createIdentityInput.hiveVaultProvider)
          .seal(storePassword);

      // Save the DID document
      await this.didService.storeDIDDocument(user.id, didDocument);

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
        user: { connect: { id: user.id } },
        didStoreRootIdentityId: rootIdentity.getId()
      }
    });

    const identity = await this.prisma.identity.create({
      data: {
        did: identityDid,
        identityRoot: { connect: { id: identityRoot.id } },
        derivationIndex: derivationIndex,
        user: { connect: { id: user.id } },
        publicationId: "",
      }
    })

    const createCredentialInput = {
      identityDid: identityDid,
      credentialId: '#name',
      types: ["https://ns.elastos.org/credentials/v1#SelfProclaimedCredential", "https://ns.elastos.org/credentials/profile/name/v1#NameCredential"],
      expirationDate: moment().add(5, 'year').toDate(),
      properties: {
        "name": createIdentityInput.name
      }
    }
    await this.credentialsService.create(createCredentialInput, user);

    // publish DID
    const payload = await this.didService.createDIDPublishTransaction(user.id, identityDid, storePassword);
    const { publicationId } = await this.publishIdentity(identityDid, payload);
    identity.publicationId = publicationId;
    this.logger.log('create identity:' + JSON.stringify(identity))
    return identity;
  }

  async deleteIdentity(didString: string, user: User) {
    this.logger.log('deleteIdentity didString:' + didString);
    const successfulDeletion = await this.didService.deleteIdentity(didString, user.id);
    if (successfulDeletion) {
      await this.credentialsService.deleteCredentialsByIdentity(didString);

      await this.prisma.identity.delete({
        where: {
          did: didString
        }
      })
    } else {
      this.logger.warn('deleteIdentity error');
    }
    return successfulDeletion;
  }

  async createDIDPublishTransaction(didString: string, user: User) {
    this.logger.log("createDIDPublishTransaction:" + didString)
    const storePassword = '123456'; // TODO: use account key

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
    this.logger.log("publishIdentity:" + didString)

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
    if (!identity)
      throw new AppException(AuthExceptionCode.IdentityNotOwned, `You are not owner of identity ${identityDid}`, 401);

    return identity;
  }
}
