import { gqlIdentityFields } from "./identity.fields";

export const gqlRootIdentityFields = `
  id
  createdAt
  didStoreRootIdentityId
  Identity { ${gqlIdentityFields} }
`;
