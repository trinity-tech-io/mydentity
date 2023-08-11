import { DIDStore, Mnemonic, RootIdentity } from '@elastosfoundation/did-js-sdk';
import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class DidService {

  generateMnemonic(language: string) {
    let mnemonic = Mnemonic.getInstance(language);
    return mnemonic.generate();
  }

  async openStore(didStorePath: string) : Promise<DIDStore> {
    let didStoreDir = join(__dirname, "../..", "didstores", didStorePath);
    console.log('didStoreDir:', didStoreDir);

    return await DIDStore.open(didStoreDir);
  }

  /**
   * Create rootIdentity if no exist, or use the exist rootIdenity.
   * @param didStorePath
   * @param storePassword
   * @returns
   */
  async getRootIdentity(didStorePath: string, storePassword: string) {
    let didStore = await this.openStore(didStorePath);

    let rootIdentity: RootIdentity = null;
    if (!didStore.containsRootIdentities()) {
      // Create DID SDK root identity
      console.log('not contains rootIdentities,create rootIdentity');
      rootIdentity = this.initPrivateIdentity(didStore, storePassword);
    } else {
      console.log('contains rootIdentities, use the exist rootIdentity');
      rootIdentity = await didStore.loadRootIdentity();
    }

    return rootIdentity;
  }

  initPrivateIdentity(didStore: DIDStore, storepass: string, language: string = Mnemonic.ENGLISH) {
    let mnemonic = this.generateMnemonic(language);
    let passphrase = ''; // Do not use passphrase

    let rootIdentity = RootIdentity.createFromMnemonic(mnemonic, passphrase, didStore, storepass, true);
    return rootIdentity;
  }
}
