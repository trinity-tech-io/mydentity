import { DIDBackend, DIDStore, DefaultDIDAdapter, Mnemonic, RootIdentity } from '@elastosfoundation/did-js-sdk';
import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class DidService {
  private network = 'mainnet';

  generateMnemonic(language: string) {
    return Mnemonic.getInstance(language).generate();
  }

  async openStore(didStorePath: string) : Promise<DIDStore> {
    const didStoreDir = join(__dirname, "../..", "didstores", didStorePath);
    console.log('didStoreDir:', didStoreDir);
    // Logger.setLevel(Logger.INFO)

    return await DIDStore.open(didStoreDir);
  }

  /**
   * Create rootIdentity if no exist, or use the exist rootIdenity.
   * @param didStorePath
   * @param storePassword
   * @returns
   */
  async getRootIdentity(didStorePath: string, storePassword: string) {
    const didStore = await this.openStore(didStorePath);

    const didAdapter = new DefaultDIDAdapter(this.network);
    DIDBackend.initialize(didAdapter);

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

  async deleteIdentity(didString: string, didStorePath: string) {
    console.log('IdentityService', 'deleteIdentity didString:', didString);
    const didStore = await this.openStore(didStorePath);
    // TODO: Delete credentials
    const ret = didStore.deleteDid(didString);
    return ret;
  }
}
