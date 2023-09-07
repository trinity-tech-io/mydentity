import { VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import type { Interfaces, Wallet } from "@elastosfoundation/elastos-connectivity-sdk-js";

/**
 * This internal elastos connector is used for now to produce app instance DIDs in order to
 * authenticate this app as a hive app allowed to use a user's hive vault.
 */
export class InternalElastosConnector implements Interfaces.Connectors.IConnector {
    public name = "did-web-internal";

    // eslint-disable-next-line require-await
    async getDisplayName(): Promise<string> {
        return "DID Web service internal connector";
    }

    generateAppIdCredential(appInstanceDID: string): Promise<VerifiableCredential> {
        /* logger.log("connector", "App ID Credential generation flow started");

        // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
        return new Promise(async (resolve, reject) => {
            try {
                // No such credential, so we have to create one. Send an intent to get that from the did app
                let res: { result: { credential: string } } = await essentialsIntentManager.sendIntent("https://did.elastos.net/appidcredissue", {
                    appinstancedid: appInstanceDID
                });

                logger.log("connector", "Got response for the appidcredissue intent", res);

                if (!res || !res.result || !res.result.credential) {
                    console.warn("Missing credential information. The operation was maybe cancelled.");
                    resolve(null);
                    return;
                }
                let credential = VerifiableCredential.parse(res.result.credential);
                resolve(credential);
            }
            catch (err) {
                logger.error("connector", "generateAppIDCredential() error:", err);
                resolve(null);
            }
        }); */
        return null;
    }

    getWeb3Provider(): unknown {
        throw new Error("Method not implemented.");
    }
    pay(query: Wallet.PayQuery): Promise<Wallet.TransactionResult> {
        throw new Error("Method not implemented.");
    }
    voteForDPoS(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    voteForCRCouncil(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    voteForCRProposal(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    sendSmartContractTransaction(payload: any): Promise<string> {
        throw new Error("Method not implemented.");
    }
}