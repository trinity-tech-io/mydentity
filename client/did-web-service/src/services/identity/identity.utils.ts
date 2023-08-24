/**
 * Converts long form DIDs to truncated formdisplay form:
 * - From: did:elastos:abcdefghijklmno
 * - To: did:elastos:abcde...klmno
 */
export function shortenDID(did: string, lettersToKeep = 5): string {
  const parts = did.split(':');
  if (parts.length < 3) {
    // Invalid identifier format
    return did;
  }

  const thirdPart = parts[2];
  if (thirdPart.length <= lettersToKeep * 2) {
    // No need to shorten, return the original identifier
    return did;
  }

  const shortenedThirdPart = `${thirdPart.substr(0, lettersToKeep)}...${thirdPart.substr(-lettersToKeep)}`;
  return `${parts[0]}:${parts[1]}:${shortenedThirdPart}`;
}