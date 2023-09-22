import { JSONObject, VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import { DID, Interfaces, Wallet, logger } from "@elastosfoundation/elastos-connectivity-sdk-js";
import { ConnectorOptions } from ".";
import { RuntimeOptions, setRuntimeOptions } from "./config/runtime-options";
import { DID as ConnDID } from "./did/did";
import { setResponseHandler, tryToGrabPostRedirectResponse } from "./response-processor";

export class DIDWebConnector implements Interfaces.Connectors.IConnector {
    public name: string = "didweb";

    constructor(options?: ConnectorOptions) {
        const defaultOptions: RuntimeOptions = {
            webServiceEndpoint: "https://didweb.com", // TODO
            webServiceAPIEndpoint: "https://api.didweb.com", // TODO
        }
        const runtimeOptions = Object.assign({}, defaultOptions, options);
        setRuntimeOptions(runtimeOptions);

        this.registerResponseProcessors();
    }

    getWeb3Provider() {
        throw new Error("Method not implemented.");
    }

    async getDisplayName(): Promise<string> {
        return "DID Web Service";
    }

    private registerResponseProcessors() {
        ConnDID.registerResponseProcessors();
    }

    registerResponseHandler(handler: Interfaces.Connectors.ConnectorResponseHandler) {
        logger.log("Registered response handler on the web connector");
        setResponseHandler(handler);

        tryToGrabPostRedirectResponse();
    }

    /**
     * DID API
     */
    requestCredentialsV2(requestId: string, request: DID.CredentialDisclosureRequest): Promise<void> {
        return ConnDID.requestCredentials(requestId, request);
    }

    issueCredential(holder: string, types: string[], subject: JSONObject, identifier?: string, expirationDate?: string): Promise<VerifiableCredential> {
        throw new Error("Method not implemented.");
    }

    importCredentialsV2(requestId: string, credentials: VerifiableCredential[], options?: DID.ImportCredentialOptions): Promise<void> {
        return ConnDID.importCredentials(requestId, credentials, options);
    }

    deleteCredentials(credentialIds: string[], options?: DID.DeleteCredentialOptions): Promise<string[]> {
        throw new Error("Method not implemented.");
    }

    signData(data: string, jwtExtra?: any, signatureFieldName?: string): Promise<DID.SignedData> {
        throw new Error("Method not implemented.");
    }

    requestPublish(): Promise<string> {
        throw new Error("Method not implemented.");
    }

    updateHiveVaultAddress(vaultAddress: string, displayName: string): Promise<DID.UpdateHiveVaultAddressStatus> {
        throw new Error("Method not implemented.");
    }

    importCredentialContext(serviceName: string, contextCredential: VerifiableCredential): Promise<DID.ImportedCredential> {
        throw new Error("Method not implemented.");
    }

    generateAppIdCredential(appInstanceDID: string, appDID: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    generateHiveBackupCredential?(sourceHiveNodeDID: string, targetHiveNodeDID: string, targetNodeURL: string): Promise<VerifiableCredential> {
        throw new Error("Method not implemented.");
    }

    pay(query: any): Promise<Wallet.TransactionResult> {
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

    /**
     * UI API
     */
    onBoard(feature: string, title: string, introduction: string, button: string) {
        throw new Error("Method not implemented.");
    }
}