import { DIDDocument, RootIdentity } from '@elastosfoundation/did-js-sdk';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Identity, User } from '@prisma/client';
import { CredentialsService } from 'src/credentials/credentials.service';
import { AssistTransactionStatus, DIDPublishingService } from 'src/did-publishing/did-publishing.service';
import { DidService } from 'src/did/did.service';
import { AppException } from 'src/exceptions/app-exception';
import { DIDExceptionCode } from 'src/exceptions/exception-codes';
import { logger } from 'src/logger';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIdentityInput } from './dto/create-identity.input';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

@Injectable()
export class IdentityService {
  constructor(private prisma: PrismaService,
    private credentialsService: CredentialsService,
    private didPublishingService: DIDPublishingService,
    private didService: DidService) { }

  async create(createIdentityInput: CreateIdentityInput, user: User): Promise<Identity> {
    logger.log('IdentityService', 'create', user);
    const storePassword = '123456'; // TODO: use account key

    let rootIdentity: RootIdentity = null;
    let didDocument: DIDDocument = null;
    let identityDid: string = null;

    try {
      // Get rootIdentity to new did.
      rootIdentity = await this.didService.getRootIdentity(user.id, storePassword);

      didDocument = await rootIdentity.newDid(storePassword);
      identityDid = didDocument.getSubject().toString();
    } catch (e) {
      logger.log('IdentityService', 'create exception:', e)
      throw new AppException(DIDExceptionCode.DIDStorageError, e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // One user can create multiple dids, so we save the derivation index.
    const derivationIndex = rootIdentity.getIndex() - 1;
    logger.log('IdentityService', 'create did index', derivationIndex);

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
    const {publicationId} = await this.publishIdentity(identityDid, payload);
    identity.publicationId = publicationId;
    logger.log('IdentityService', 'create identity:', identity)
    return identity;
  }

  async deleteIdentity(didString: string, user: User) {
    logger.log('IdentityService', 'deleteIdentity didString:', didString);
    const successfulDeletion = await this.didService.deleteIdentity(didString, user.id);
    if (successfulDeletion) {
      await this.credentialsService.deleteCredentialsByIdentity(didString);

      await this.prisma.identity.delete({
        where: {
          did: didString
        }
      })
    } else {
      logger.warn('IdentityService', 'deleteIdentity error');
    }
    return successfulDeletion;
  }

  async createDIDPublishTransaction(didString: string, user: User) {
    logger.log('IdentityService', "createDIDPublishTransaction", didString)
    const storePassword = '123456'; // TODO: use account key

    const payload = await this.didService.createDIDPublishTransaction(user.id, didString, storePassword);
    return {
      payload: payload.toString(),
    }
  }

  async publishIdentity(didString: string, payloadObject: any) {
    logger.log('IdentityService', "publishIdentity", didString)

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

  async getPublicationStatus(didString: string, publicationId: string) {
    logger.log('IdentityService', "getPublicationStatus", publicationId)

    // Get status from prisma first
    const identiy = await this.prisma.identity.findFirst({
      where: {
        did: didString,
        publicationId
      }
    })

    // Already published
    if (identiy.publishedAt) {
      return AssistTransactionStatus.COMPLETED;
    }

    const assistTransactionStatusResponse = await this.didPublishingService.getPublicationStatus(publicationId);
    if (assistTransactionStatusResponse.data.status == AssistTransactionStatus.COMPLETED) {
      await this.prisma.identity.update({
        where: {
          did: didString,
          publicationId
        },
        data: {
          publishedAt: moment(assistTransactionStatusResponse.data.modified).toDate()
        }
      });
    }
    return assistTransactionStatusResponse.data.status;
  }

  findAll(user: User) {
    return this.prisma.identity.findMany({
      where: {
        userId: user.id
      }
    })
  }
}
