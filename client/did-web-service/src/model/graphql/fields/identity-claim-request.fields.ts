import { gqlClaimableIdentityInfoFields } from "./claimable-identity-info.fields";

export const gqlIdentityClaimRequestFields = `
  id
  identityInfo { ${gqlClaimableIdentityInfoFields} }
  claimUrl
  expiresAt
  claimCompletedAt
`;
