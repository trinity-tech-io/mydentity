import { gqlIdentityFields } from "./identity.fields";

export const gqlIdentityClaimRequestFields = `
  id 
  identity { ${gqlIdentityFields} }
  claimUrl
`;
