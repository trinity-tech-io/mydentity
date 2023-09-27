import { gqlIdentityFields } from "./identity.fields";

export const gqlRootIdentityFields = `
  id
  createdAt
  didStoreRootIdentityId
  userId
  Identity { ${gqlIdentityFields} }
`;
