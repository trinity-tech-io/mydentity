import { VerifiableCredential } from '@elastosfoundation/did-js-sdk';
import { Injectable, Logger } from '@nestjs/common';
import { Browser, Credential, User } from '@prisma/client';
import { DidService } from 'src/did/did.service';
import { AppException } from 'src/exceptions/app-exception';
import { AuthExceptionCode } from 'src/exceptions/exception-codes';
import { KeyRingService } from 'src/key-ring/key-ring.service';
import { logger } from 'src/logger';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCredentialInput } from './dto/create-credential.input';
import { CreateVerifiablePresentationInput } from './dto/create-verifiablePresentation.input';
import { ImportCredentialInput } from './dto/import-credential.input';
import { IssueCredentialInput } from './dto/issue-credential.input';
import { CredentialWithStringVC } from './model/credential-with-vc';

@Injectable()
export class CredentialsService {
  private logger: Logger = new Logger("CredentialsService");

  constructor(private prisma: PrismaService,
      private didService: DidService,
      private keyRingService: KeyRingService) {
  }

  async create(input: CreateCredentialInput, user: User, browser: Browser) {
    this.logger.log("create")
    const storePassword = this.getDIDStorePassword(user?.id, browser?.id);

    const vc = await this.didService.createCredential(user.id, input.identityDid, input.credentialId,
      input.types, input.expirationDate, input.properties, storePassword);

    const credentials = await this.prisma.credential.create({
      data: {
        identityDid: input.identityDid,
        credentialId: vc.id.toString(),
      },
    });
    return {
      ...credentials,
      verifiableCredential: vc.toString(),
    };
  }

  async storeCredential(input: ImportCredentialInput, user: User, browser: Browser) {
    const storePassword = this.getDIDStorePassword(user?.id, browser?.id);

    const vc = VerifiableCredential.parse(input.credentialString);
    this.logger.log("storeCredential")
    await this.didService.storeCredential(user.id, vc, storePassword);

    const credentials = await this.prisma.credential.create({
      data: {
        identityDid: input.identityDid,
        credentialId: vc.id.toString(),
      },
    });
    return {
      ...credentials,
      verifiableCredential: vc.toString(),
    };
  }

  async issueCredential(input: IssueCredentialInput, user: User, browser: Browser) {
    this.logger.log("issueCredential")
    const storePassword = this.getDIDStorePassword(user?.id, browser?.id);

    const vc = await this.didService.issueCredential(user.id, input.identityDid, input.subjectDid, input.credentialId,
      input.types, input.expirationDate, input.properties, storePassword);
    return {
      verifiableCredential: vc.toString(),
    };
  }

  async findOne(id: string): Promise<Credential> {
    return this.prisma.credential.findUnique({ where: { id } });
  }

  async findAll(identityDid: string, user: User, browser: Browser): Promise<CredentialWithStringVC[]> {
    const credentials = await this.prisma.credential.findMany({
      where: { identityDid },
    });

    const storePassword = this.getDIDStorePassword(user?.id, browser?.id);

    const output: CredentialWithStringVC[] = [];
    for (const c of credentials) {
      const didCredential = await this.didService.loadCredential(user.id, c.credentialId, storePassword);
      if (!didCredential) {
        logger.warn(`Credential with id ${c.id} has no matching VerifiableCredential in the DID Store...`);
        continue;
      }

      output.push({
        ...c,
        verifiableCredential: didCredential.toString(),
      });
    }

    return output;
  }

  async remove(id: string, user: User) {
    const credential = await this.findOne(id);
    if (!credential)
      return false;

    const successfulDeletion = await this.didService.deleteCredential(user.id, credential.credentialId);
    if (successfulDeletion)
      await this.prisma.credential.delete({ where: { id } });

    return successfulDeletion;
  }

  async deleteIdentityCredentials(identityDid: string): Promise<Credential[]> {
    const credentials = await this.prisma.credential.findMany({ where: { identityDid } });
    await this.prisma.credential.deleteMany({
      where: {
        id: {
          in: credentials.map(c => c.id)
        }
      }
    });
    return credentials;
  }

  async createVerifiablePresentation(input: CreateVerifiablePresentationInput, user: User, browser: Browser) {
    this.logger.log("createVerifiablePresentation")
    const storePassword = this.getDIDStorePassword(user?.id, browser?.id);

    const credentials = [];
    input.credentials.forEach(c => {
      credentials.push(VerifiableCredential.parse(c))
    })
    const vp = await this.didService.createVerifiablePresentationFromCredentials(user.id, input.identityDid, credentials,
      input.nonce, input.realm, storePassword);
    return {
      verifiablePresentation: vp.toString(),
    }
  }

  /**
  * Ensures that the credential is owned by user and returns the credential.
  * If not, throws an exception.
  */
  public async ensureOwnedCredential(id: string, user: User): Promise<Credential> {
    const credential = await this.prisma.credential.findFirst({
      where: {
        id,
        identity: {
          userId: user.id
        }
      }
    })
    if (!credential)
      throw new AppException(AuthExceptionCode.CredenialNotOwned, `You are not owner of credential ${id}`, 401);

    return credential;
  }

  private getDIDStorePassword(userId: string, browserId: string) {
    this.logger.log('getDIDStorePassword:' + userId + ' browserId:' + browserId);
    const password = this.keyRingService.getMasterKey(userId, browserId);
    return password;
  }
}
