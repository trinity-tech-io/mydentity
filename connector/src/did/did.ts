import { DIDURL, VerifiableCredential, VerifiablePresentation } from "@elastosfoundation/did-js-sdk";
import { DID as SDKDID } from "@elastosfoundation/elastos-connectivity-sdk-js";
import { ImportedCredential } from "@elastosfoundation/elastos-connectivity-sdk-js/typings/did";
import { createFrontEndIntentEndpoint, createIntentRequest } from "../intents/api";
import { IntentEntity } from "../intents/intent";
import { IntentType } from "../intents/intent-type";
import { registerIntentResponseProcessor } from "../response-processor";
import { getSafeApplicationDID } from "../utils";

export class DID {
    static registerResponseProcessors() {
        registerIntentResponseProcessor(IntentType.REQUEST_CREDENTIALS, DID.processRequestCredentialsResponse);
        registerIntentResponseProcessor(IntentType.IMPORT_CREDENTIALS, DID.processImportCredentialsResponse);
    }

    static async requestCredentials(requestId: string, disclosureRequest: SDKDID.CredentialDisclosureRequest): Promise<void> {
        // Create the request payload as JSON object
        const caller = getSafeApplicationDID();
        const request = { ...disclosureRequest, caller, requestId };

        // Call the API method to create an intent and pass the request (without graphql client lib)
        const intentId = await createIntentRequest(IntentType.REQUEST_CREDENTIALS, request);

        // Redirect current web page to Mydentity, with the intent id
        const serviceEndpoint = createFrontEndIntentEndpoint(IntentType.REQUEST_CREDENTIALS, intentId);
        window.location.href = serviceEndpoint;
    }

    static async processRequestCredentialsResponse(intent: IntentEntity): Promise<VerifiablePresentation> {
        const presentation = VerifiablePresentation.parse(intent.responsePayload);
        return presentation;
    }

    static async importCredentials(requestId: string, credentials: VerifiableCredential[], options?: SDKDID.ImportCredentialOptions): Promise<void> {
        // Create the request payload as JSON object
        const caller = getSafeApplicationDID();
        const request = {
            credentials: credentials.map(c => c.toString()),
            options,
            caller,
            requestId
        };

        // Call the API method to create an intent and pass the request (without graphql client lib)
        const intentId = await createIntentRequest(IntentType.IMPORT_CREDENTIALS, request);

        // Redirect current web page to Mydentity, with the intent id
        const serviceEndpoint = createFrontEndIntentEndpoint(IntentType.IMPORT_CREDENTIALS, intentId);
        window.location.href = serviceEndpoint;
    }

    static async processImportCredentialsResponse(intent: IntentEntity): Promise<ImportedCredential[]> {
        let importedCredentials: ImportedCredential[];
        importedCredentials = (intent.responsePayload as string[]).map(credentialUrl => {
            return {
                id: DIDURL.from(credentialUrl)
            }
        });
        return importedCredentials;
    }
}


// OLD CODE WHERE WE USED POST_MESSAGE BETWEEN TABS TO SEND THE RESPONSE
// Capture messages sent from the web service window
/* window.addEventListener('message', event => {
    // Check if the message is from our web service window
    if (event.source === serviceWindow && event.data) {
        const response = <IntentResponsePayload<string>>event.data;
        // Make sure we get a response for the right intent ID
        if (response.intentId === intentId) {
            console.log("The Mydentity connector got a response from Mydentity:", response);

            if (!response || !response.responsePayload) {
                console.warn("Missing presentation. The operation was maybe cancelled.", response);
                resolve(null);
                return;
            }

            // TODO const presentation = VerifiablePresentation.parse(response.responsePayload);
            // TODO resolve(presentation)
            resolve(null); // TODO replace ith real presentation

            // Close the external service window and refocus on our window
            closeWebServiceWindow(serviceWindow);
        }
    }
}); */