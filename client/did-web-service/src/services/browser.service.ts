import jwtDecode from "jwt-decode";
import { logger } from "./logger";
import { AccessTokenPayload } from "./user/access-token-payload";

const BROWSER_ID_STORAGE_KEY = "browser-client-id";

/**
 * If we have no browser id saved yet, update browser ID from the access token when we get a new access token. This is because the browser ID
 * is generated by the backend, and returned to use in the JWT token after authentication. As this browser ID is sent back
 * to the backend with every GQL API calls, the server doesn't generate a new browser id any more.
 */
export function checkNewAccessTokenForBrowserId(accessToken: string) {
  let decodedToken: AccessTokenPayload;
  try {
    decodedToken = jwtDecode(accessToken);
  }
  catch (e) {
    logger.error("browser", "Access token received from the backend cannot be decoded!");
    return;
  }

  console.log("decodedToken", decodedToken)

  const existingBrowserId = getBrowserId();
  if (existingBrowserId) {
    // TODO: check if browser ID is still the same. If not, report error.
    return;
  }

  setBrowserId(decodedToken.browserId);
}

export function getBrowserId(): string {
  return localStorage.getItem(BROWSER_ID_STORAGE_KEY);
}

export function setBrowserId(browserId: string) {
  localStorage.setItem(BROWSER_ID_STORAGE_KEY, browserId);
}