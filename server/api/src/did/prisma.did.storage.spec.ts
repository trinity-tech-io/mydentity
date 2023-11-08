import { Test, TestingModule } from '@nestjs/testing';
import { PrismaDIDStorage } from "./prisma.did.storage";
import {
    DIDBackend, DIDDocument,
    DIDStore, DIDURL, HDKey,
    Issuer,
    Mnemonic,
    RootIdentity,
    SimulatedIDChainAdapter
} from "@elastosfoundation/did-js-sdk";
import { PrismaService } from "../prisma/prisma.service";
import { PrismaModule } from "../prisma/prisma.module";

jest.setTimeout(120000);

/**
 * Use the following commands to run the test cases.
 *      - npm run simchain # Run this under the DID JS SDK tests folder.
 *      - npm test -- prisma.did.storage.spec.ts
 */
describe('PrismaDIDStorage', () => {
    let service: PrismaDIDStorage;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PrismaDIDStorage],
            imports: [PrismaModule],
        }).compile();

        service = module.get<PrismaDIDStorage>(PrismaDIDStorage);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('testPrismaDIDStorage', async () => {
        console.log('>>>>>> testPrismaDIDStorage');
        expect(service).toBeDefined();

        //create user
        // const prisma = new PrismaService();
        const user = await prisma.user.create({
            data: {
                name: "foobar",
                fullName: "Foo Bar",
                // temporaryEmailAuthKey: "string",
                // temporaryEmail: "string"
            }});
        console.log(`user id: ${user.id}`);

        DIDBackend.initialize(new SimulatedIDChainAdapter(
            "http://127.0.0.1:9123"));

        //open DIDStore
        DIDStore.register("ds", PrismaDIDStorage);
        const store = await DIDStore.open(user.id, "ds");

        //step1: check identities(no)
        let c = await store.containsRootIdentities();
        if (c)
            console.log("[error] there are root identities in the did store.");
        else
            console.log("1. no root identities.");

        let identities = await store.listRootIdentities();
        if (identities.length)
            console.log("[error] there are root identities in the did store.");
        else
            console.log("2. no root identities.");

        //step2: check dids(no)
        c = await store.containsDids();
        if (c)
            console.log("[error] there are dids in the did store.");
        else
            console.log("3. no dids.");

        let dids = await store.listDids();
        if(dids.length)
            console.log("[error] has dids");
        else
            console.log("4. no dids.");

        //step3: create two identities
        const mg = Mnemonic.getInstance();
        const mnemonic1 = mg.generate();
        const identity1 = await RootIdentity.createFromMnemonic(mnemonic1, null, store, "1234");
        const identityId1 = identity1.getId();
        console.log("5. mnemonic: " + mnemonic1 + ", create the first root identity: " + identityId1);

        const mnemonic2 = mg.generate();
        const identity2 = await RootIdentity.createFromMnemonic(mnemonic2, null, store, "1234");
        const identityId2 = identity2.getId();
        console.log("6. mnemonic: " + mnemonic2 + ", create the second root identity: " + identityId2);

        //step4: check identities(two)
        c = await store.containsRootIdentities();
        if (c)
            console.log("7. there are root identities in the did store.");
        else
            console.log("[error] no root identities in the did store.");

        identities = await store.listRootIdentities();
        if (identities.length)
            console.log("8. there are " + identities.length + " root identities in the did store.");
        else
            console.log("[error] no root identities in the did store.");

        for (const r of identities) {
            if (r.getId() != identityId1 && r.getId() != identityId2)
                console.log("[error] mismatch root identity.");
        }
        console.log("9. all root identities are right.");

        c = await store.containsRootIdentity(identityId1);
        if (c)
            console.log("10. check the first root identity successfully.");
        else
            console.log("[error] check the first root identity failed.");

        let m = await store.exportRootIdentityMnemonic(identityId1, "1234");
        if (m && m == mnemonic1)
            console.log("11. export the first root identity mnemonic successfully.");
        else
            console.log("[error] export the first root identity mnemonic failed.");

        m = await store.exportRootIdentityMnemonic(identityId2, "1234");
        if (m && m == mnemonic2)
            console.log("12. export the second root identity mnemonic successfully.");
        else
            console.log("[error] export the second root identity mnemonic failed.");

        //step5: delete root identity2
        c = await store.deleteRootIdentity(identityId2);
        if (c)
            console.log("13. delete the second root identity successfully.");
        else
            console.log("[error] delete the second root identity failed.");

        c = await store.containsRootIdentity(identityId2);
        if (c)
            console.log("[error] the second root identity exists in the did store.");
        else
            console.log("14. the second root identity doesn't exist in the did store.");

        identities = await store.listRootIdentities();
        if (identities.length == 1)
            console.log("15. there are " + identities.length + " root identities in the did store.");
        else
            console.log("[error] no root identities in the did store.");

        //step6: create diddocument
        const doc1 = await identity1.newDid("1234");
        if (doc1) {
            console.log("16.create the first document: " + doc1.getSubject());
        } else {
            console.log("[error] create the frist document failed.");
            return;
        }
        await store.storeDid(doc1);
        const did1 = doc1.getSubject();
        await doc1.publish("1234");

        const doc2 = await identity1.newDid("1234");
        if (doc2) {
            console.log("17.create the second document: " + doc2.getSubject());
        } else {
            console.log("[error] create the second document failed.");
            return;
        }
        await store.storeDid(doc2);
        const did2 = doc2.getSubject();
        await doc2.publish("1234");

        //step7: check diddocuments
        c = await store.containsDids();
        if (c)
            console.log("18. there are dids in the did store.");
        else
            console.log("[error] no dids.");

        dids = await store.listDids();
        if(dids.length)
            console.log("19. there are " + dids.length + " dids in the did store.");
        else
            console.log("[error] no dids.");

        for (const d of dids) {
            if (d.toString() != did1.toString() && d.toString() != did2.toString())
                console.log("[error] mismatch root identity.");
        }
        console.log("20. all dids are right.");

        //step8: create two credentials
        const issuer = await Issuer.create(doc1);
        const cb1 = issuer.issueFor(doc1.getSubject());
        const vc1 = await cb1.id("#myCredential1")
            .typeWithContext("SelfProclaimedCredential", "https://ns.elastos.org/credentials/v1")
            .typeWithContext("ProfileCredential", "https://ns.elastos.org/credentials/profile/v1")
            .property("nationality", "Singapore")
            .seal("1234");
        const vcId1 = vc1.getId();
        console.log("21. create the first credential: " + vcId1.toString());

        const cb2 = issuer.issueFor(doc1.getSubject());
        let vc2 = await cb2.id("#myCredential2")
            .typeWithContext("SelfProclaimedCredential", "https://ns.elastos.org/credentials/v2")
            .typeWithContext("ProfileCredential", "https://ns.elastos.org/credentials/profile/v2")
            .property("nationality", "Chinese")
            .seal("1234");
        const vcId2 = vc2.getId();
        console.log("22. create the second credential: " + vcId2.toString());

        await store.storeCredential(vc2, "1234");
        await vc2.declare(doc1.getDefaultPublicKey().getId(), "1234");

        //step9: load doc
        let doc = await store.loadDid(did1);
        if (doc) {
            console.log("23. load the first document successfully.");
        } else {
            console.log("[error] load the first document failed.");
            return;
        }

        c = await store.containsCredential(vcId1);
        if (c)
            console.log("[error] credential " + vcId1.toString() + " is in the didstore.");
        else
            console.log("24. credential " + vcId1.toString() + " isn't in the didstore.");

        c = await store.containsCredential(vcId2);
        if (c)
            console.log("25. credential " + vcId2.toString() + " isn't in the didstore.");
        else
            console.log("[error] credential " + vcId2.toString() + " is in the didstore.");

        //step10: add vc to doc and store doc
        doc = await did1.resolve();
        await store.storeDid(doc);
        let db = DIDDocument.Builder.newFromDocument(doc).edit();
        await db.addCredential(vc1);
        doc = await db.seal("1234");

        await store.storeDid(doc);
        await doc.publish("1234");

        doc = await did1.resolve();
        await store.storeDid(doc);
        if (doc) {
            console.log("26.load the first document successfully.");
        } else {
            console.log("[error] load the first document failed.");
            return;
        }

        let vc = doc.getCredential(vcId1);
        if (vc)
            console.log("27. get the first credential(update) from document successfully.");
        else
            console.log("[error] load the first credential(update) failed.");

        vc = doc.getCredential(vcId2);
        if (vc)
            console.log("[error] get the second credential(update) from document.");
        else
            console.log("28. get the second credential(update) from document failed.");

        //step11: check credentials
        c = await store.containsCredentials(did1);
        if(c)
            console.log("29. doc1 has credentials in the did store.");
        else
            console.log("[error] doc1 doesn't have credentilas in the did store.");

        c = await store.containsCredentials(did2);
        if (c)
            console.log("[error] doc2 has credentials in the did store.");
        else
            console.log("30. doc2 doesn't have credentials in the did store.");

        let vcs = await store.listCredentials(did1);
        if (vcs.length == 2)
            console.log("31. the first did has two credentials in the did store.");
        else
            console.log("[error] the first did doesn't have two credentials in the did store.");

        vcs = await store.listCredentials(did2);
        if (vcs.length)
            console.log("[error] the second did has credentials in the did store.");
        else
            console.log("32. the second did doesn't have credentials in the did store.");

        c = await store.containsCredential(vcId1);
        if (c)
            console.log("33. the first credential exists in the did store.");
        else
            console.log("[error] the first credential doesn't exist in the did store.");

        c = await store.containsCredential(vcId2);
        if (c)
            console.log("34. the second credential exists in the did store.");
        else
            console.log("[error] the second credential doesn't exist in the did store.");

        vc = await store.loadCredential(vcId1);
        if (vc)
            console.log("35. credential " + vcId1.toString() + " is in the didstore.");
        else
            console.log("[error] credential " + vcId1.toString() + " isn't in the didstore.");

        vc = await store.loadCredential(vcId2, "1234");
        if (vc)
            console.log("36. credential " + vcId2.toString() + " is in the didstore.");
        else
            console.log("[error] credential " + vcId2.toString() + " isn't in the didstore.");

        //step12: delete doc2
        c = await store.deleteDid(did2);
        if (c)
            console.log("37. delete the second did successfully.");
        else
            console.log("[error] delete the did failed.");

        dids = await store.listDids();
        if (dids.length == 1)
            console.log("37. there are one did in the did store.");
        else
            console.log("[error] wrong dids in the did store.");

        console.log(`>>>>>> 37.dids: `, dids.map(d => d.toJSON()));

        //step13:
        c = await store.containsPrivateKeys(did1);
        if (c)
            console.log("38. the first did has private key.");
        else
            console.log("[error] the firist did doesn't have private key.");

        c = await store.containsPrivateKeys(did2);
        if (c)
            console.log("[error] the second did has private key.");
        else
            console.log("39. the second did doesn't have private key.");

        //step14: changePassword
        await store.changePassword("1234", "2345");
        console.log('after await store.changePassword');
        db = DIDDocument.Builder.newFromDocument(doc).edit();
        console.log('after await store.changePassword 2');
        const id = DIDURL.from("#test1", did1);
        console.log('after await store.changePassword 3');
        const mnemonic =  Mnemonic.getInstance().generate();
        console.log('after await store.changePassword 4');
        const rootKey = HDKey.newWithMnemonic(mnemonic, "");
        console.log('after await store.changePassword 5');
        const key = rootKey.deriveWithPath(HDKey.DERIVE_PATH_PREFIX + 0);
        console.log('after await store.changePassword 6');
        db.createAndAddPublicKey(id, key.getPublicKeyBase58(), db.getSubject());
        console.log('after await store.changePassword 7');
        await store.storePrivateKey(id, key.serialize(), "2345");
        console.log('after await store.changePassword 8');
        doc = await db.seal("2345");
        console.log('after await store.changePassword 9');
        if (doc)
            console.log("40. change password successfully.");
        else
            console.log("[error] change password failed.");

        c = await store.deletePrivateKey(id);
        if (c)
            console.log("41. delete private key successfully.");
        else
            console.log("[error] delete private key failed.");

        //step15
        vc2 = await store.loadCredential(vcId2, "2345");
        if (vc2)
            console.log("42. load the second credential successfully.");
        else
            console.log("[error] load the second credential failed.");
    });
});