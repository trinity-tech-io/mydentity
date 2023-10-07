import { DIDBackend, DIDDocument, DIDStore, DefaultDIDAdapter, Exceptions, Features, Issuer, JSONObject, Mnemonic, RootIdentity, VerifiableCredential, VerifiablePresentation } from '@elastosfoundation/did-js-sdk';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AppException } from 'src/exceptions/app-exception';
import { DIDExceptionCode } from 'src/exceptions/exception-codes';
import { DidAdapter } from './did.adapter';
import { PrismaDIDStorage } from './prisma.did.storage';

@Injectable()
export class DidService {
  private network = 'mainnet';
  private didStoreCache: { [context: string]: DIDStore } = {};
  private globalDidAdapter: DidAdapter = null;

  private logger: Logger = new Logger("DidService");

  constructor() {
    this.globalDidAdapter = new DidAdapter();
    DIDBackend.initialize(new DefaultDIDAdapter(this.network));
    Features.enableJsonLdContext(true);
  }

  generateMnemonic(language: string) {
    try {
      return Mnemonic.getInstance(language).generate();
    } catch (e) {
      throw new AppException(DIDExceptionCode.MnemonicError, e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async openStore(path: string): Promise<DIDStore> {
    if (path in this.didStoreCache)
      return this.didStoreCache[path];

    DIDStore.register("ds", PrismaDIDStorage);
    const didStore = await DIDStore.open(path, "ds");
    if (!didStore)
      throw new AppException(DIDExceptionCode.DIDStorageError, "Can't open did store: " + path, HttpStatus.INTERNAL_SERVER_ERROR);

    this.didStoreCache[path] = didStore;
    return didStore;
  }

  /**
   * Create rootIdentity if no exist, or use the exist rootIdenity.
   * @param context
   * @param storePassword
   * @returns
   */
  async getRootIdentity(context: string, storePassword: string) {
    const didStore = await this.openStore(context);

    let rootIdentity: RootIdentity = null;
    if (!(await didStore.containsRootIdentities())) {
      // Create DID SDK root identity
      this.logger.log('No root identities, creating a root identity');
      rootIdentity = await this.initPrivateIdentity(didStore, storePassword);
    } else {
      this.logger.log('Root identities found - reusing the existing root identity');
      rootIdentity = await didStore.loadRootIdentity();
    }

    if (!rootIdentity)
      throw new AppException(DIDExceptionCode.DIDStorageError, "Can't load rootIdentity", HttpStatus.INTERNAL_SERVER_ERROR);

    return rootIdentity;
  }

  /**
   * Load rootIdentity.
   * @param context
   * @param rid: root identity id
   * @returns
   */
  async loadRootIdentity(context: string, rid: string) {
    const didStore = await this.openStore(context);

    const rootIdentity: RootIdentity = await didStore.loadRootIdentity(rid);
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
  async deleteIdentity(didString: string, context: string) {
    this.logger.log('deleteIdentity didString:' + didString);
    const didStore = await this.openStore(context);

    // Delete all credentials belonging to this did
    const credentials = await didStore.listCredentials(didString);
    for (const c of credentials) {
      await didStore.deleteCredential(c);
    }

    const successfulDeletion = didStore.deleteDid(didString);
    if (!successfulDeletion) {
      const didExist = await didStore.loadDid(didString);
      //the did is deleted before.
      if (!didExist) return true;
    }

    return successfulDeletion;
  }

  async storeDIDDocument(context: string, didDocument: DIDDocument): Promise<void> {
    const didStore = await this.openStore(context);
    await didStore.storeDid(didDocument);
  }

  async createCredential(context: string, didString: string, credentialId: string, types: string[], expirationDate: Date, properties, storepass: string) {
    try {
      const vc = await this.issueCredential(context, didString, didString, credentialId, types, expirationDate, properties, storepass);
      const didStore = await this.openStore(context);
      // save to did store
      await didStore.storeCredential(vc, storepass);
      return vc;
    } catch (e) {
      if (e instanceof Exceptions.CredentialAlreadyExistException) {
        throw new AppException(DIDExceptionCode.CredentialAlreadyExists, e.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new AppException(DIDExceptionCode.DIDStorageError, e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async issueCredential(context: string, didString: string, subjectDid: string, credentialId: string, types: string[], expirationDate: Date, properties, storepass: string) {
    try {
      const didStore = await this.openStore(context);
      const didDocument = await didStore.loadDid(didString);
      if (!didDocument)
        throw new AppException(DIDExceptionCode.DIDDoesNotExist, "Can't load did:" + didString, HttpStatus.NOT_FOUND);

      const issuer = await Issuer.create(didDocument);
      const vcBuilder = issuer.issueFor(subjectDid);
      const vc = await vcBuilder.id(credentialId).types(...types).expirationDate(expirationDate).properties(properties).seal(storepass);
      return vc;
    } catch (e) {
      if (e instanceof Exceptions.CredentialAlreadyExistException) {
        throw new AppException(DIDExceptionCode.CredentialAlreadyExists, e.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new AppException(DIDExceptionCode.DIDStorageError, e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async loadCredential(context: string, credentialId: string, storePassword: string) {
    try {
      const didStore = await this.openStore(context);
      return await didStore.loadCredential(credentialId, storePassword);
    } catch (e) {
      throw new AppException(DIDExceptionCode.DIDStorageError, e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async storeCredential(context: string, credential: VerifiableCredential, storePassword: string) {
    try {
      const didStore = await this.openStore(context);
      return await didStore.storeCredential(credential, storePassword);
    } catch (e) {
      throw new AppException(DIDExceptionCode.DIDStorageError, e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteCredential(context: string, credentialId: string) {
    const didStore = await this.openStore(context);
    this.logger.log('deleteCredential credentialId: ' + credentialId)
    return didStore.deleteCredential(credentialId);
  }

  /**
   * We can publish the credential if the credential is added to the did document.
   */
  async addCredentialToDIDDocument(context: string, didString: string, credentialId: string, storePassword: string) {
    try {
      const didStore = await this.openStore(context);
      const didDocument = await didStore.loadDid(didString);
      if (!didDocument)
        throw new AppException(DIDExceptionCode.DIDDoesNotExist, "Can't load did:" + didString, HttpStatus.NOT_FOUND);

      const credential = await didStore.loadCredential(credentialId, storePassword);
      const docBuilder = DIDDocument.Builder.newFromDocument(didDocument).edit();
      const newDoc = await (await docBuilder.addCredential(credential)).seal(storePassword);
      await didStore.storeDid(newDoc);
    } catch (e) {
      if (e instanceof Exceptions.CredentialAlreadyExistException) {
        // Do nothing
      } else {
        throw new AppException(DIDExceptionCode.DIDStorageError, e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  /**
   * We don't publish the credential if the credential is removed from the did document.
   * The credential is still stored in didstore, so we can load it.
   */
  async removeCredentialFromDIDDocument(context: string, didString: string, credentialId: string, storePassword: string) {
    try {
      const didStore = await this.openStore(context);
      const didDocument = await didStore.loadDid(didString);
      if (!didDocument)
        throw new AppException(DIDExceptionCode.DIDDoesNotExist, "Can't load did:" + didString, HttpStatus.NOT_FOUND);

      const docBuilder = DIDDocument.Builder.newFromDocument(didDocument).edit();
      const newDoc = await (await docBuilder.removeCredential(credentialId)).seal(storePassword);
      await didStore.storeDid(newDoc);
    } catch (e) {
      if (e instanceof Exceptions.DIDObjectNotExistException) {
        // Do nothing
      } else {
        throw new AppException(DIDExceptionCode.DIDStorageError, e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async createVerifiablePresentationFromCredentials(context: string, didString: string,
    vc: VerifiableCredential[], nonce: string, realm: string, storepass: string) {
    const didStore = await this.openStore(context);

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
  async createDIDPublishTransaction(context: string, didString: string, storepass: string) {
    this.logger.log('createDIDPublishTransaction:' + didString)
    const didStore = await this.openStore(context);
    const didDocument = await didStore.loadDid(didString);
    if (!didDocument)
      throw new AppException(DIDExceptionCode.DIDDoesNotExist, "Can't load did:" + didString, HttpStatus.NOT_FOUND);

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
      this.logger.warn('createDIDPublishTransaction error:', e);
      if (e instanceof Exceptions.NetworkException) {
        throw new AppException(DIDExceptionCode.NetworkError, e.message, HttpStatus.SERVICE_UNAVAILABLE);
      } else if (e instanceof Exceptions.DIDNotUpToDateException) {
        throw new AppException(DIDExceptionCode.DIDNotUpToDateError, e.message, HttpStatus.BAD_REQUEST);
      } else if (e instanceof Exceptions.DIDTransactionException) {
        throw new AppException(DIDExceptionCode.DIDTransactionError, e.message, HttpStatus.BAD_REQUEST);
      } else if (e instanceof Exceptions.DIDNotFoundException) {
        throw new AppException(DIDExceptionCode.DIDDoesNotExist, e.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new AppException(DIDExceptionCode.DIDPublishError, e.message, HttpStatus.BAD_REQUEST);
      }
    }

    return this.globalDidAdapter.getPayload();
  }

  async addService(context: string, didString: string, id: string, type: string, endpoint: string, properties: JSONObject, storepass: string) {
    const didStore = await this.openStore(context);
    const didDocument = await didStore.loadDid(didString);
    if (!didDocument)
      throw new AppException(DIDExceptionCode.DIDDoesNotExist, "Can't load did:" + didString, HttpStatus.NOT_FOUND);

    try {
      const newDidDocument = await DIDDocument.Builder.newFromDocument(didDocument)
        .addService(id, type, endpoint, properties)
        .seal(storepass);

      // Save the DID document
      await this.storeDIDDocument(context, newDidDocument);
    } catch (e) {
      this.logger.log(`DID addService exception: ${e}`)
      if (e instanceof Exceptions.DIDObjectAlreadyExistException) {
        throw new AppException(DIDExceptionCode.DIDObjectAlreadyExist, e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      } else {
        throw new AppException(DIDExceptionCode.DIDStorageError, e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async removeService(context: string, didString: string, id: string, storepass: string) {
    const didStore = await this.openStore(context);
    const didDocument = await didStore.loadDid(didString);
    if (!didDocument)
      throw new AppException(DIDExceptionCode.DIDDoesNotExist, "Can't load did:" + didString, HttpStatus.NOT_FOUND);

    try {
      const newDidDocument = await DIDDocument.Builder.newFromDocument(didDocument)
        .removeService(id)
        .seal(storepass);

      // Save the DID document
      await this.storeDIDDocument(context, newDidDocument);
    } catch (e) {
      this.logger.log(`DID removeService exception: ${e}`)
      if (e instanceof Exceptions.DIDObjectNotExistException) {
        throw new AppException(DIDExceptionCode.DIDObjectNotExist, e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      } else {
        throw new AppException(DIDExceptionCode.DIDStorageError, e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async getDidDocument(context: string, didString: string) {
    const didStore = await this.openStore(context);
    const didDocument = await didStore.loadDid(didString);
    if (!didDocument)
      throw new AppException(DIDExceptionCode.DIDDoesNotExist, "Can't load did:" + didString, HttpStatus.NOT_FOUND);

    return didDocument;
  }

  async synchronize(context: string) {
    const didStore = await this.openStore(context);
    try {
      await didStore.synchronize();
    } catch (e) {
      if (e instanceof Exceptions.NetworkException) {
        throw new AppException(DIDExceptionCode.NetworkError, e.message, HttpStatus.SERVICE_UNAVAILABLE);
      } else {
        throw new AppException(DIDExceptionCode.DIDStorageError, e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
