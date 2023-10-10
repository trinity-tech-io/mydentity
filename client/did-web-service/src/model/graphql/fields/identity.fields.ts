const gqlIdentityBaseFields = `
  did
  type
  createdAt
  lastUsedAt
  identityRootId
`;

export const gqlIdentityFields = `
  ${gqlIdentityBaseFields}
  creatingAppIdentity { ${gqlIdentityBaseFields} }
`;
