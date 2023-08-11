import { Test, TestingModule } from '@nestjs/testing';
import { DidService } from './did.service';

describe('DidService', () => {
  let service: DidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DidService],
    }).compile();

    service = module.get<DidService>(DidService);
  });
/*
  it('Test generateMnemonic', () => {
    let mnemonic = service.generateMnemonic(Mnemonic.CHINESE_SIMPLIFIED);
    console.log('mnemonic :', mnemonic);

    expect(mnemonic.split(' ')).toHaveLength(12);
  });
*/
  it('Test openStore', async () => {
    let didStore = await service.openStore('test');
    expect((await didStore.listDids()).length).toEqual(0);

    service.initPrivateIdentity(didStore, '123456');

    let rootIdentity = await didStore.loadRootIdentity();
    let id = rootIdentity.getId();
    console.log('rootIdentity id :', id);


  });
});
