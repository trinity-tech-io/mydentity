import { Test, TestingModule } from '@nestjs/testing';
import { DIDPublishingService } from './did-publishing.service';

describe('DidService', () => {
  let service: DIDPublishingService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DIDPublishingService],
    }).compile();
    service = module.get<DIDPublishingService>(DIDPublishingService);
  });
/*
  it('Test publishDID', async () => {
    // TODO: get payload by did service
    const payload = {"header":{"specification":"elastos/did/1.0","operation":"create"},"payload":"eyJpZCI6ImRpZDplbGFzdG9zOmlhOTJLQ3JKcGFzYVVZdzl5SGpibTVjd3BQUWJNVFpDdWkiLCJwdWJsaWNLZXkiOlt7ImlkIjoiZGlkOmVsYXN0b3M6aWE5MktDckpwYXNhVVl3OXlIamJtNWN3cFBRYk1UWkN1aSNwcmltYXJ5IiwidHlwZSI6IkVDRFNBc2VjcDI1NnIxIiwiY29udHJvbGxlciI6ImRpZDplbGFzdG9zOmlhOTJLQ3JKcGFzYVVZdzl5SGpibTVjd3BQUWJNVFpDdWkiLCJwdWJsaWNLZXlCYXNlNTgiOiJ2dnE0Y3FHZHZUbWQ4RjlFaVdvODdxeHl5OWs5U3hWWW1EUlBvQTVuY1lQaiJ9XSwiYXV0aGVudGljYXRpb24iOlsiZGlkOmVsYXN0b3M6aWE5MktDckpwYXNhVVl3OXlIamJtNWN3cFBRYk1UWkN1aSNwcmltYXJ5Il0sImV4cGlyZXMiOiIyMDI4LTA4LTIzVDAzOjMxOjE2WiIsInByb29mIjp7InR5cGUiOiJFQ0RTQXNlY3AyNTZyMSIsImNyZWF0ZWQiOiIyMDIzLTA4LTIzVDAzOjMxOjE2WiIsImNyZWF0b3IiOiJkaWQ6ZWxhc3RvczppYTkyS0NySnBhc2FVWXc5eUhqYm01Y3dwUFFiTVRaQ3VpI3ByaW1hcnkiLCJzaWduYXR1cmVWYWx1ZSI6Ilhoc2JaMG8zeEV1bFhOMEtDSW94YXRZQlBRUnM0SjNac0huYmUwVFk5RDQyNUNKLTBoSzRZU1QwNVBERHZ4eDhrcFNvYjNjd3FxZml2c0M4MHd2SDhBIn19","proof":{"type":"ECDSAsecp256r1","verificationMethod":"did:elastos:ia92KCrJpasaUYw9yHjbm5cwpPQbMTZCui#primary","signature":"oslQcNcU-mvTQ1UfM-zXfCz7eHS0y7P7w496Rq4H5f3e1FgT6USo5kNd9FCFqroVsErzvUmLVlIYuBSyOWKWUw"}}
    // const payload = {"header":{"specification":"elastos/did/1.0","operation":"update","previousTxid":"a8914cc0d93855e48063d1811eeaf27ec4e1927015eebe509438ad8b9b075897"},"payload":"eyJpZCI6ImRpZDplbGFzdG9zOmlhOTJLQ3JKcGFzYVVZdzl5SGpibTVjd3BQUWJNVFpDdWkiLCJwdWJsaWNLZXkiOlt7ImlkIjoiZGlkOmVsYXN0b3M6aWE5MktDckpwYXNhVVl3OXlIamJtNWN3cFBRYk1UWkN1aSNwcmltYXJ5IiwidHlwZSI6IkVDRFNBc2VjcDI1NnIxIiwiY29udHJvbGxlciI6ImRpZDplbGFzdG9zOmlhOTJLQ3JKcGFzYVVZdzl5SGpibTVjd3BQUWJNVFpDdWkiLCJwdWJsaWNLZXlCYXNlNTgiOiJ2dnE0Y3FHZHZUbWQ4RjlFaVdvODdxeHl5OWs5U3hWWW1EUlBvQTVuY1lQaiJ9XSwiYXV0aGVudGljYXRpb24iOlsiZGlkOmVsYXN0b3M6aWE5MktDckpwYXNhVVl3OXlIamJtNWN3cFBRYk1UWkN1aSNwcmltYXJ5Il0sImV4cGlyZXMiOiIyMDI4LTA4LTIzVDA2OjM1OjUyWiIsInByb29mIjp7InR5cGUiOiJFQ0RTQXNlY3AyNTZyMSIsImNyZWF0ZWQiOiIyMDIzLTA4LTIzVDA2OjM1OjUzWiIsImNyZWF0b3IiOiJkaWQ6ZWxhc3RvczppYTkyS0NySnBhc2FVWXc5eUhqYm01Y3dwUFFiTVRaQ3VpI3ByaW1hcnkiLCJzaWduYXR1cmVWYWx1ZSI6ImpLLXhEVDh4UnRTQXhOeGZ5R2JjUDMtSUo4UkpZd2FMQVVseGZYU1RET3ZibFJaV2Z0MWZOVXVqcC05bDlDdDB6RUNXNUZYWjhNaVdoS3NFTm90NWh3In19","proof":{"type":"ECDSAsecp256r1","verificationMethod":"did:elastos:ia92KCrJpasaUYw9yHjbm5cwpPQbMTZCui#primary","signature":"9fUUDGif2Iqi4N2R9zfSLWBgfyOmbU1AeQuuEo4-_yPrjpQPHVlfFEDamvj1ULvuQUIKrTLyajj7CV4HH9LtvA"}}

    try {
      const responce = await service.publishDID('did:elastos:iqerwGnCXsV8A7wXEgzFy343HJevnwooHF', payload, '');
      console.log('responce', responce)
    } catch (e) {
      expect(e).toContain("Could not generate a valid transaction out of the given didRequest")
    }
  }, 30000);
*/

  it('Test publishDID exception', async () => {
    // the payload is aready pubished.
    const payload = {"header":{"specification":"elastos/did/1.0","operation":"create"},"payload":"eyJpZCI6ImRpZDplbGFzdG9zOmlqTmF3Mzk0TUplZ1lEY3NDRXM5OWNVN3Q1c2kzTHBYNXAiLCJwdWJsaWNLZXkiOlt7ImlkIjoiZGlkOmVsYXN0b3M6aWpOYXczOTRNSmVnWURjc0NFczk5Y1U3dDVzaTNMcFg1cCNwcmltYXJ5IiwidHlwZSI6IkVDRFNBc2VjcDI1NnIxIiwiY29udHJvbGxlciI6ImRpZDplbGFzdG9zOmlqTmF3Mzk0TUplZ1lEY3NDRXM5OWNVN3Q1c2kzTHBYNXAiLCJwdWJsaWNLZXlCYXNlNTgiOiJwMm1xcGtCYkZVRTl5OW1yZHFYWFdTcmsxUm5EM3E3WlRhUUtYOE1EUkg4cyJ9XSwiYXV0aGVudGljYXRpb24iOlsiZGlkOmVsYXN0b3M6aWpOYXczOTRNSmVnWURjc0NFczk5Y1U3dDVzaTNMcFg1cCNwcmltYXJ5Il0sImV4cGlyZXMiOiIyMDI4LTA4LTIyVDA2OjI3OjMyWiIsInByb29mIjp7InR5cGUiOiJFQ0RTQXNlY3AyNTZyMSIsImNyZWF0ZWQiOiIyMDIzLTA4LTIyVDA2OjI3OjMyWiIsImNyZWF0b3IiOiJkaWQ6ZWxhc3Rvczppak5hdzM5NE1KZWdZRGNzQ0VzOTljVTd0NXNpM0xwWDVwI3ByaW1hcnkiLCJzaWduYXR1cmVWYWx1ZSI6Ik5ZdXd0UDh5MW1tcDhYOER3S2tqLWFJMUk4d1N3cXpvR0ktV3k4UFRfMlY5S0s1dVp3U2VXUVFFeXBFazg4d1VMQVh5VFRZSG01a0o3UE40bVFqa1hnIn19","proof":{"type":"ECDSAsecp256r1","verificationMethod":"did:elastos:ijNaw394MJegYDcsCEs99cU7t5si3LpX5p#primary","signature":"8Ls5nHiPddksnBnVrwP4WJV51fFDKs24GVD56H60JYQacf6R0JQa0wK8mZEPhjz0Mq9JQW8AhzyJz-7ObIE9FQ"}}

    try {
      await service.publishDID('did:elastos:iY3Q8zZePApwp5BDyVJNMe3CzoHm34vFaS', payload, '');
    } catch (e) {
      expect(e).toContain("Could not generate a valid transaction out of the given didRequest")
    }
  });


  it('Test Publication Status', async () => {
    const confirmation_id = '64e57dbe3ec29159510a7125';

    const ret = await service.getPublicationStatus(confirmation_id);
    expect(ret.data.blockchainTxId).toEqual("0xc2dc5a67f3361cc65761658f166937f101615d33c36626e351ac52f0db840e35");

  });

});

