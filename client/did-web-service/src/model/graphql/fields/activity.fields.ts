import {graphQLPublicUserEmailFields} from "@graphql/user-email.fields";
import {gqlIdentityFields} from "@graphql/identity.fields";
import {gqlBrowserFields} from "@graphql/browser.fields";

export const graphQLActivityFields = `
    id 
    type 
    userEmail { ${graphQLPublicUserEmailFields } }
    userEmailProvider 
    userEmailAddress 
    identity { ${gqlIdentityFields } }
    identityDid 
    credentialsCount 
    appDid 
    browser { ${gqlBrowserFields} } 
    browserName 
    createdAt
`;