import { gqlIdentityFields } from "./identity.fields";

export const gqlIdentityRootFields = `
  id
  createdAt
  didStoreRootIdentityId
  Identity { ${gqlIdentityFields} }
`;
