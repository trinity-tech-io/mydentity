import { DIDBackend, DIDDocument, DIDStore, DefaultDIDAdapter, Exceptions, Features, Issuer, Mnemonic, RootIdentity, VerifiableCredential, VerifiablePresentation } from '@elastosfoundation/did-js-sdk';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { join } from 'path';
import { AppException } from 'src/exceptions/app-exception';
import { DIDExceptionCode } from 'src/exceptions/exception-codes';
import { DidAdapter } from './did.adapter';

@Injectable()
export class DidService {
  private network = 'mainnet';
  private didStoreCache: { [didStorePath: string]: DIDStore } = {};
  private globalDidAdapter: DidAdapter = null;

  private logger: Logger;

  constructor() {
    this.logger = new Logger("DidService");
    this.globalDidAdapter = new DidAdapter();
    DIDBackend.initialize(new DefaultDIDAdapter(this.network));
  }

  generateMnemonic(language: string) {
    try {
      return Mnemonic.getInstance(language).generate();
    } catch (e) {
      throw new AppException(DIDExceptionCode.MnemonicError, e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async openStore(didStorePath: string) : Promise<DIDStore> {
    if (didStorePath in this.didStoreCache)
      return this.didStoreCache[didStorePath];

    const didStoreDir = join(__dirname, "../..", "didstores", didStorePath);
    // this.logger.log('didStoreDir:' + didStoreDir);
    // Logger.setLevel(Logger.INFO)

    const didStore = await DIDStore.open(didStoreDir);
    if (!didStore) {
      throw new AppException(DIDExceptionCode.DIDStorageError, "Can't open did store: " + didStoreDir, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    this.didStoreCache[didStorePath] = didStore;
    return didStore;
  }

  /**
   * Create rootIdentity if no exist, or use the exist rootIdenity.
   * @param didStorePath
   * @param storePassword
   * @returns
   */
  async getRootIdentity(didStorePath: string, storePassword: string) {
    const didStore = await this.openStore(didStorePath);

    let rootIdentity: RootIdentity = null;
    if (!didStore.containsRootIdentities()) {
      // Create DID SDK root identity
      this.logger.log('not contains rootIdentities, create rootIdentity');
      rootIdentity = this.initPrivateIdentity(didStore, storePassword);
    } else {
      this.logger.log('contains rootIdentities, use the exist rootIdentity');
      rootIdentity = await didStore.loadRootIdentity();
    }

    if (!rootIdentity)
      throw new AppException(DIDExceptionCode.DIDStorageError, "Can't load rootIdentity", HttpStatus.INTERNAL_SERVER_ERROR);

    return rootIdentity;
  }

  initPrivateIdentity(didStore: DIDStore, storepass: string, language: string = Mnemonic.ENGLISH) {
    const mnemonic = this.generateMnemonic(language);
    const passphrase = ''; // Do not use passphrase

    return RootIdentity.createFromMnemonic(mnemonic, passphrase, didStore, storepass, true);
  }

  //  DIDStore
  async deleteIdentity(didString: string, didStorePath: string) {
    this.logger.log('deleteIdentity didString:' + didString);
    const didStore = await this.openStore(didStorePath);

    // Delete all credentials belonging to this did
    const credentials = await didStore.listCredentials(didString);
    credentials.forEach( c => {
      didStore.deleteCredential(c);
    })

    const successfulDeletion = didStore.deleteDid(didString);
    if (!successfulDeletion) {
      const didExist = await didStore.loadDid(didString);
      //the did is deleted before.
      if (!didExist) return true;
    }

    return successfulDeletion;
  }

  async createCredential(didStorePath: string, didString: string, credentialId: string, types: string[], expirationDate: Date, properties, storepass: string) {
    try {
      const didStore = await this.openStore(didStorePath);
      const didDocument = await didStore.loadDid(didString);
      if (!didDocument)
        throw new AppException(DIDExceptionCode.DIDNotExists, "Can't load did:" + didString, HttpStatus.NOT_FOUND);

      Features.enableJsonLdContext(true);

      const issuer = new Issuer(didDocument);
      const vcBuilder = issuer.issueFor(didString);
      const vc = await vcBuilder.id(credentialId).types(...types).expirationDate(expirationDate).properties(properties).seal(storepass);
      // save to did store
      await didStore.storeCredential(vc);
      // didStore.storeDid(didDocument);
      return vc;
    } catch (e) {
      if (e instanceof Exceptions.CredentialAlreadyExistException) {
        throw new AppException(DIDExceptionCode.CredentialAlreadyExists, e.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new AppException(DIDExceptionCode.DIDStorageError, e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } finally {
      Features.enableJsonLdContext(false);
    }
  }

  async loadCredential(didStorePath: string, credentialId: string) {
    try {
      const didStore = await this.openStore(didStorePath);
      return await didStore.loadCredential(credentialId);
    } catch (e) {
      throw new AppException(DIDExceptionCode.DIDStorageError, e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async storeCredential(didStorePath: string, credential: VerifiableCredential) {
    try {
      const didStore = await this.openStore(didStorePath);
      return await didStore.storeCredential(credential);
    } catch (e) {
      throw new AppException(DIDExceptionCode.DIDStorageError, e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteCredential(didStorePath: string, credentialId: string) {
    const didStore = await this.openStore(didStorePath);
    this.logger.log('deleteCredential credentialId:' + credentialId)
    return didStore.deleteCredential(credentialId);
  }

  async createVerifiablePresentationFromCredentials(didStorePath: string, didString: string,
        vc: VerifiableCredential[], nonce: string, realm: string, storepass: string) {
    const didStore = await this.openStore(didStorePath);

    try {
      const vpBuilder = await VerifiablePresentation.createFor(didString, null, didStore);
      return vpBuilder.credentials(...vc).nonce(nonce).realm(realm).seal(storepass);
    } catch (e) {
      if ((e instanceof Exceptions.DIDObjectAlreadyExistException) || (e instanceof Exceptions.IllegalUsage)) {
        throw new AppException(DIDExceptionCode.InvalidCredential, e.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new AppException(DIDExceptionCode.DIDStorageError, e.message, HttpStatus.BAD_REQUEST);
      }
    }
  }

  // Get the payload of did transaction.
  async createDIDPublishTransaction(didStorePath: string, didString: string, storepass: string) {
    this.logger.log('createDIDPublishTransaction:' + didString)
    const didStore = await this.openStore(didStorePath);
    const didDocument = await didStore.loadDid(didString);
    if (!didDocument)
        throw new AppException(DIDExceptionCode.DIDNotExists, "Can't load did:" + didString, HttpStatus.NOT_FOUND);

    const isExpired = didDocument.isExpired();

    try {
      const docBuilder = DIDDocument.Builder.newFromDocument(didDocument).edit();
      const newDoc = await docBuilder.setDefaultExpires().seal(storepass);

      if (isExpired) {
        await newDoc.publish(storepass, null, true, this.globalDidAdapter);
      } else {
        await newDoc.publish(storepass, null, false, this.globalDidAdapter);
      }
    } catch (e) {
      if (e instanceof Exceptions.DIDNotUpToDateException) {
        throw new AppException(DIDExceptionCode.DIDNotUpToDateError, e.message, HttpStatus.BAD_REQUEST);
      } if (e instanceof Exceptions.DIDTransactionException) {
        throw new AppException(DIDExceptionCode.DIDTransactionError, e.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new AppException(DIDExceptionCode.DIDNotExists, e.message, HttpStatus.BAD_REQUEST);
      }
    }

    return this.globalDidAdapter.getPayload();
  }
}
