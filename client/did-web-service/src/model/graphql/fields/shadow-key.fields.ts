import { gqlBrowserFields } from "./browser.fields";

export const gqlShadowKeyFields = `
  createdAt
  updatedAt
  keyId
  key
  type
  browser { ${gqlBrowserFields} }
`;
