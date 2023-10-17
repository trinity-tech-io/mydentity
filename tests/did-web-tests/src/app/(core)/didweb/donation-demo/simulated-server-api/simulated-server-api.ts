import { configure, createManagedIdentity, generateClaimUrl, getManagedIdentityStatus, importManagedIdentityCredentials } from "@trinitytech/did-web-service-sdk";
import { produceUserCredentials } from "./helpers/did-helpers";
import { ProducedCredentialsResponse } from "./model/produced-credentials";

configure({
  // Secret developer access key
  accessKey: process.env.NEXT_PUBLIC_DID_WEB_SDK_DEVELOPER_KEY,
  appDID: process.env.NEXT_PUBLIC_DID_WEB_SDK_APP_DID,
  webServiceEndpoint: process.env.NEXT_PUBLIC_FRONTEND_URL,
  webServiceAPIEndpoint: process.env.NEXT_PUBLIC_BACKEND_URL,
});

/**
 * Simulated storage of identity did/access token map. In a real app, this mapping is to be persisted
 * into database to always be able to get access to a generated identity.
 */
const identityAccessTokenMap: { [did: string]: string } = {
  // TEMP FOR DEV WITHOUT CREATING IDENTITY EVERY TIME
  "did:elastos:iqoh6bPpKuMozeLRGLHjxMrtBNGRnsVpAk": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6IjA0MmMxODA5LWUwOTgtNGJiYy1iZjQxLWIyYzNiYzZhZGQ5NSIsImlkZW50aXR5RElEIjoiZGlkOmVsYXN0b3M6aXFvaDZiUHBLdU1vemVMUkdMSGp4TXJ0Qk5HUm5zVnBBayIsImlhdCI6MTY5NTk2MTEwOSwiZXhwIjoxNjk4NTUzMTA5fQ.SSeJtzR2Nus6TUmry_BQS_EQvX8CjrimjdLWELoYAW0"
}

/**
 * From the app backend, requests the DID Web service to create a managed identity.
 * That managed identity will belong to our app temporarily, until the user decides to claim it.
 */
export async function api_createManagedIdentity(): Promise<string> {
  try {
    const createdIdentity = await createManagedIdentity();
    /* const createdIdentity = {
      did: Object.keys(identityAccessTokenMap)[0],
      identityAccessToken: Object.values(identityAccessTokenMap)[0]
    }; // TEMP DEV */
    console.log("Created identity:", createdIdentity);

    identityAccessTokenMap[createdIdentity.did] = createdIdentity.identityAccessToken;

    return createdIdentity.did;
  }
  catch (e) {
    console.error("Failed to create managed identity:", e);
    return null;
  }
}

/**
 * Generates and imports credentials to the given user (did).
 *
 * If the identity is a managed one (by this backend), we use the DID Web SDK to directly
 * import the credentials into the DID web service after creation.
 *
 * If the identity is a user one (external identity wallet we don't have access to), then we return the
 * credentials after creation and they must be imported into the identity wallet by the user himself,
 * from the client side.
 *
 * @param simulateManagedIdentity set to false to pretend this identity is not managed (while they all are in this demo) thus not import the credentials from the backend
 */
export async function api_produceUserCredentials(userDidString: string, name: string, simulateManagedIdentity: boolean): Promise<ProducedCredentialsResponse> {
  // Generate the credentials
  const credentials = await produceUserCredentials(userDidString, name);

  // Check if the identity is a managed one. If it is, import the VCs using the DID Web SDK.
  let imported: boolean;
  if (simulateManagedIdentity) {
    // Make sure our "database" contains the access token for this target user DID
    const identityAccessToken = identityAccessTokenMap[userDidString];
    if (!identityAccessToken)
      throw new Error("No access token stored for target managed user identity " + userDidString);

    // Call the SDK method to know if the identity is (still) managed (not claimed) by the given identity token
    const managedIdentityStatus = await getManagedIdentityStatus(identityAccessToken);
    console.log("managedIdentityStatus", managedIdentityStatus);

    if (!managedIdentityStatus?.claimed) {
      // We still have access to this identity, let's try to import directly
      const importResult = await importManagedIdentityCredentials(identityAccessToken, credentials);
      console.log("importResult", importResult)
      imported = true;
    }
    else {
      // Identity deleted or claimed, we lost access to it. So we let the client side know that we could
      // not import.
      imported = false;
    }
  }
  else {
    // We must simulate that the identity is not managed, so we just don't try to import the VCs
    // and we return them to the client side for it to import them.
    imported = false;
  }

  return {
    credentials: credentials.map(vc => vc.toString()),
    imported
  };
}

export async function api_generateClaimUrl(userDidString: string) {
  // Make sure our "database" contains the access token for this target user DID
  const identityAccessToken = identityAccessTokenMap[userDidString];
  if (!identityAccessToken)
    throw new Error("No access token stored for target managed user identity " + userDidString);

  const claimRequest = await generateClaimUrl(identityAccessToken);

  console.log("claimRequest", claimRequest);

  return claimRequest;
}