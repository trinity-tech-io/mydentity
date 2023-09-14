import { MainButton } from "@components/generic/MainButton";
import { JSONObject, VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import { DID as ConnDID } from "@elastosfoundation/elastos-connectivity-sdk-js";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { Intent } from "@model/intent/intent";
import { IntentRequestPayload } from "@model/intent/request-payload";
import { credentialTypesService } from "@services/credential-types/credential.types.service";
import { activeIdentity$ } from "@services/identity/identity.events";
import { issuerService } from "@services/identity/issuer.service";
import { fulfilIntentRequest } from "@services/intent.service";
import { setQueryParameter } from "@utils/urls";
import { FC, useState } from "react";
import { ActivityType } from "@model/activity/activity-type";
import { authUser$ } from "@services/user/user.events";
import { logger } from "@services/logger";
import jsonpath from "jsonpath";
import { V1Claim } from "./model/v1claim";

export type CredentialDisplayEntry = {
  credential: VerifiableCredential;
  selected: boolean;
  expired: boolean;
}

export type ClaimDisplayEntry = {
  claimDescription: ConnDID.ClaimDescription; // Original claim request from the intent
  matchingCredentials: CredentialDisplayEntry[]; // Credentials matching the requested claim
}

export const RequestDetails: FC<{
  intent: Intent<ConnDID.CredentialDisclosureRequest>;
}> = ({ intent }) => {
  const TAG = "RequestCredentialsIntent";
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const [credentials] = useBehaviorSubject(activeIdentity?.get("credentials").credentials$);
  const [preparingResponse, setPreparingResponse] = useState(false);
  const [wrongTargetDID, setWrongTargetDID] = useState<boolean>(false);
  const [requestingAppIcon, setRequestingAppIcon] = useState<string>('');
  const [requestingAppName, setRequestingAppName] = useState<string>('Demo App');
  const [claimsHaveBeenOrganized, setClaimsHaveBeenOrganized] = useState<boolean>(false);

  const payload = intent.requestPayload;
  const [activeUser] = useBehaviorSubject(authUser$);

  logger.log(TAG, "payload", payload)

  useEffect(() => {
    runPreliminaryChecks();
    if (credentials && payload) {
      fetchApplicationDidInfo(payload);
      organizeRequestedClaims(payload).then(organizedClaims => {
        logger.log(TAG, "Organized claims", organizedClaims);
        // setImportedCredentials(importedCredentials);
      });
    }
  }, [credentials, payload]);

  /**
   * Check a few things after entering the screen. Mostly, imported credentials content quality.
   */
  const runPreliminaryChecks = (): void => {
    //TODO
    setWrongTargetDID(false);
  }

  const fetchApplicationDidInfo = async (payload: IntentRequestPayload<ConnDID.CredentialDisclosureRequest>): Promise<void> => {
    const callingAppDID = payload.caller;
    if (callingAppDID) {
      // Fetch the application from chain.
      const isPublished = await issuerService.isPublished(callingAppDID);
      if (isPublished) {
        const appName = await issuerService.getIssuerName(callingAppDID);
        logger.log(TAG, "Requesting App name:", appName);
        setRequestingAppName(appName);

        const appIcon = await issuerService.getIssuerAvatar(callingAppDID);
        setRequestingAppIcon(appIcon);
      } else {
        logger.warn(TAG, "Requesting App is not published.");
      }
    }
  }

  /**
   * Runs through all claims in the incoming request and set default value whenever needed.
   */
  const prepareRawClaims = (payload: IntentRequestPayload<ConnDID.CredentialDisclosureRequest>): ConnDID.ClaimDescription[] => {
    // Copy claims received as input as a new object that we can manipulate.
    let rawClaims: ConnDID.ClaimDescription[] = JSON.parse(JSON.stringify((payload.claims)));

    // Convert old claim formats if needed
    const newRawClaims = convertRawClaimsIfNeeded(payload);
    if (newRawClaims)
      rawClaims = newRawClaims;

    rawClaims.forEach(claim => {
      if (claim.min === undefined)
        claim.min = 1;
      if (claim.max === undefined)
        claim.max = 1;

      return claim;
    });

    return rawClaims;
  }

  /**
   * Method for backward compatibility to convert v1 claim formats (before May 2022) to v2 claim
   * format (after May 2022).
   */
  const convertRawClaimsIfNeeded = (payload: IntentRequestPayload<ConnDID.CredentialDisclosureRequest>): ConnDID.ClaimDescription[] => {
    if (!("_version" in payload)) {
      // Version 1 - convert old claims to new format (with claim descriptions)
      const newClaims: ConnDID.ClaimDescription[] = [];
      const oldClaims = payload.claims as any as V1Claim[];

      for (const oldClaim of oldClaims) {
        const newClaimDescription = ConnDID.claimDescription(oldClaim.reason)
          .withMin(oldClaim.min)
          .withMax(oldClaim.max)
          .withNoMatchRecommendations(oldClaim.noMatchRecommendations)
          .withClaim(new ConnDID.Claim()
            .withQuery(oldClaim.query)
            .withIssuers(oldClaim.issuers)
          );

        newClaims.push(newClaimDescription);
      }

      return newClaims;
    }
    else {
      // Nothing to change - good format
      return null;
    }
  }

  /**
   * From the raw list of claims requested by the caller, we create our internal model
   * ready for UI.
   */
  const organizeRequestedClaims = async (payload: IntentRequestPayload<ConnDID.CredentialDisclosureRequest>): Promise<ClaimDisplayEntry[]> => {
    const organizedClaims: ClaimDisplayEntry[] = [];

    const rawClaims: ConnDID.ClaimDescription[] = prepareRawClaims(payload);

    // Split into mandatory and optional items
    for (const claimDescription of rawClaims) {
      logger.log(TAG, "Organizing claim", claimDescription);

      // Convert our DID store credentials list into a searcheable array of JSON data for jsonpath
      const searcheableCredentials: JSONObject[] = [];
      for (const vc of credentials) {
        const credentialJson = JSON.parse(await vc.verifiableCredential.toString());

        // Virtually append more "types" to the credential, to make json path resolve more queries
        // including full type like:
        // "$[?(@.type.indexOf('did://elastos/xxx/MyCred123#MyCred') >= 0)]"
        await appendTypesWithContextsToJsonCredential(vc.verifiableCredential, credentialJson);

        searcheableCredentials.push(credentialJson);
      }
      let matchingCredentialJsons: JSONObject[] = [];

      let matchingCredentials: CredentialDisplayEntry[] = [];
      for (const claim of claimDescription.claims) {
        try {
          matchingCredentialJsons = matchingCredentialJsons.concat(jsonpath.query(searcheableCredentials, claim.query));
          logger.log(TAG, "Matching credentials (json)", matchingCredentialJsons);
        }
        catch (e) {
          // jsonpath error
          logger.warn(TAG, "JSON Path exception", e);
        }

        // Rebuild a list of real credential objects from json results
        matchingCredentials = matchingCredentials.concat(matchingCredentialJsons.map(jsonCred => {
          const credential = credentials.find(c => c.verifiableCredential.getId().toString() === jsonCred.id);

          // Check if the credential is expired
          // TODO
          // let expirationInfo = this.expirationService.verifyCredentialExpiration(this.did.pluginDid.getDIDString(), credential.pluginVerifiableCredential, 0);
          const isExpired = false;
          // if (expirationInfo) // hacky case, but null expirationInfo means we should not check the expiration... (legacy)
          //   isExpired = expirationInfo.daysToExpire <= 0;

          // Check if the issuers can match (credential issuer must be in claim's issuers list, if provided)
          if (claim.issuers) {
            const matchingIssuer = claim.issuers.find(i => i === credential.verifiableCredential.getIssuer().toString());
            if (!matchingIssuer)
              return null;
          }

          return {
            credential: credential.verifiableCredential,
            selected: false, // Don't select anything yet, we'll update this just after
            expired: isExpired
          };
        }).filter(c => c !== null));
      }

      // Decide which credentials should be selected by default or not. Strategy:
      // - min = max = number of matching creds = 1 -> select the only cred
      // - all other cases: don't select anything
      if (claimDescription.min == 1 && claimDescription.max === claimDescription.min && matchingCredentials.length === 1) {
        matchingCredentials[0].selected = true;
      }

      const organizedClaim: ClaimDisplayEntry = {
        claimDescription: claimDescription,
        matchingCredentials
      }

      organizedClaims.push(organizedClaim);
    }

    setClaimsHaveBeenOrganized(true);

    logger.log(TAG, "Organized claims", organizedClaims);
    return organizedClaims;
  }

  /**
   * Expands the credential using JSONLD in order to get a list of matching contexts + short types.
   * Based on this info, builds the corresponding elastos-queryable full types in the form of
   * context#shortType (this is a elastos format, not a real type in JSONLD) and appens
   * this "full type" to the current list of types in the credential json payload.
   *
   * This allows jsonpath / connectivity sdk to query full types easily.
   */
  const appendTypesWithContextsToJsonCredential = async (vc: VerifiableCredential, credentialJson: JSONObject): Promise<void> => {
    const typesWithContext = await credentialTypesService.resolveTypesWithContexts(vc);

    for (const twc of typesWithContext) {
      const fullQueryType = `${twc.context}#${twc.shortType}`;
      const jsonTypes = credentialJson.type as string[];
      if (jsonTypes.indexOf(fullQueryType) < 0)
        jsonTypes.push(fullQueryType);
    }
  }

  // User approves the upcoming request - data will be returned to the calling dApp.
  const approveRequest = async (): Promise<void> => {
    setPreparingResponse(true);

    // Generate the VP for the Active identity and fulfill the request with its JSON value.
    const selectedCredentials: VerifiableCredential[] = []; // TODO - real selection from user
    const presentation = await activeIdentity.createVerifiablePresentation(
      selectedCredentials,
      payload.realm,
      payload.nonce);

    if (!presentation) {
      // Failed to get a presentation, or cancelled
      setPreparingResponse(false);
      return;
    }

    // Now fulfil the intent request using this generated VP. The connector will then be able to
    // grab the result from the API.
    const responsePayload = presentation.toString(true);
    const fulfilled = await fulfilIntentRequest(intent.id, responsePayload);
    if (fulfilled) {
      // TODO: check fulfilled success - if error report error to user

      const activity = await activeUser?.get('activity').createActivity(ActivityType.VC_CREATED, { did: activeIdentity.did });
      if (!activity) {
        logger.warn(`failed to create activity for VC created by ${activeIdentity.did}`);
      }

      // Send the response to the original app, including the intent id as parameter.
      // The web connector will catch this parameter to retrieve the intent response payload and
      // to deliver it to the app through the connectivity sdk.
      const redirectUrl = setQueryParameter(intent.redirectUrl, "rid", intent.id);
      window.location.href = redirectUrl;
    }
  }

  return <>This app XXX is requesting information from you:
    <br /><br />
    Intent: {intent.id}
    <br /><br />
    List of credentials
    <br /><br />
    {activeIdentity && <MainButton onClick={approveRequest} busy={preparingResponse}>Approve</MainButton>}
    {!activeIdentity && "Make an identity active to continue"}
  </>
}