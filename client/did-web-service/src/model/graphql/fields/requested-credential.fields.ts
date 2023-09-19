import { gqlCredentialFields } from "./credential.fields";

export const gqlRequestedCredentialsFields = `
  id
  credential { ${gqlCredentialFields} }
`;
