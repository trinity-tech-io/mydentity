import { DIDBackend, DIDDocument, DIDStore, DefaultDIDAdapter, Issuer, Logger, Mnemonic, RootIdentity, VerifiableCredential, VerifiablePresentation } from '@elastosfoundation/did-js-sdk';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { logger } from '../logger';
import { DidAdapter } from './did.adapter';

@Injectable()
export class DidService {
  private network = 'mainnet';
  private didStoreCache: { [didStorePath: string]: DIDStore } = {};
  private globalDidAdapter: DidAdapter = null;

  generateMnemonic(language: string) {
    return Mnemonic.getInstance(language).generate();
  }

  async openStore(didStorePath: string) : Promise<DIDStore> {
    if (didStorePath in this.didStoreCache)
      return this.didStoreCache[didStorePath];

    const didStoreDir = join(__dirname, "../..", "didstores", didStorePath);
    console.log('didStoreDir:', didStoreDir);
    Logger.setLevel(Logger.INFO)

    const didStore = await DIDStore.open(didStoreDir);
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

    this.globalDidAdapter = new DidAdapter();
    DIDBackend.initialize(new DefaultDIDAdapter(this.network));

    let rootIdentity: RootIdentity = null;
    if (!didStore.containsRootIdentities()) {
      // Create DID SDK root identity
      console.log('not contains rootIdentities, create rootIdentity');
      rootIdentity = this.initPrivateIdentity(didStore, storePassword);
    } else {
      console.log('contains rootIdentities, use the exist rootIdentity');
      rootIdentity = await didStore.loadRootIdentity();
    }
    return rootIdentity;
  }

  initPrivateIdentity(didStore: DIDStore, storepass: string, language: string = Mnemonic.ENGLISH) {
    const mnemonic = this.generateMnemonic(language);
    const passphrase = ''; // Do not use passphrase

    return RootIdentity.createFromMnemonic(mnemonic, passphrase, didStore, storepass, true);
  }

  //  DIDStore
  async deleteIdentity(didString: string, didStorePath: string) {
    console.log('DidService', 'deleteIdentity didString:', didString);
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
    const didStore = await this.openStore(didStorePath);
    const didDocument = await didStore.loadDid(didString);
    const issuer = new Issuer(didDocument);
    const vcBuilder = issuer.issueFor(didString);
    const vc = await vcBuilder.id(credentialId).types(...types).expirationDate(expirationDate).properties(properties).seal(storepass);
    // save to did store
    await didStore.storeCredential(vc);
    // didStore.storeDid(didDocument);
    return vc;
  }

  async loadCredential(didStorePath: string, credentialId: string) {
    const didStore = await this.openStore(didStorePath);
    return await didStore.loadCredential(credentialId);
  }

  async deleteCredential(didStorePath: string, credentialId: string) {
    const didStore = await this.openStore(didStorePath);
    console.log('deleteCredential credentialId', credentialId)
    return didStore.deleteCredential(credentialId);
  }

  async createVerifiablePresentationFromCredentials(didStorePath: string, didString: string,
        vc: VerifiableCredential[], nonce: string, realm: string, storepass: string) {
    const didStore = await this.openStore(didStorePath);

    const vpBuilder = await VerifiablePresentation.createFor(didString, null, didStore);
    return vpBuilder.credentials(...vc).nonce(nonce).realm(realm).seal(storepass);
  }

  // Get the payload of did transaction.
  async publishDID(didStorePath: string, didString: string, storepass: string) {
    logger.log('DidService', 'publishDID', didString)
    const didStore = await this.openStore(didStorePath);
    const didDocument = await didStore.loadDid(didString);

    const isExpired = didDocument.isExpired();

    const docBuilder = DIDDocument.Builder.newFromDocument(didDocument).edit();
    const newDoc = await docBuilder.setDefaultExpires().seal(storepass);
    if (isExpired) {
      await newDoc.publish(storepass, null, true, this.globalDidAdapter);
    } else {
      await newDoc.publish(storepass, null, false, this.globalDidAdapter);
    }

    return this.globalDidAdapter.getPayload();
  }
}
