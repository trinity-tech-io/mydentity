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

    let store: DIDStore = await DIDStore.open(didStoreDir);
    return store
  }

  initPrivateIdentity(didStore: DIDStore, storepass: string, language: string = Mnemonic.ENGLISH) {
    let mnemonic = this.generateMnemonic(language);
    let passphrase = ''; // Do not use passphrase

    let rootIdentity = RootIdentity.createFromMnemonic(mnemonic, passphrase, didStore, storepass, true);
    return rootIdentity;
  }
}
