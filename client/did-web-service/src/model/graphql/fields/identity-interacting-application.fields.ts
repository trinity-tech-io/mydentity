import { gqlInteractingApplicationFields } from "./interacting-application.fields";

export const gqlIdentityInteractingApplicationFields = `
  id
  interactingApplication { ${gqlInteractingApplicationFields} }
`;
