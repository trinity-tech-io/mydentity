export {
    createManagedIdentity,
    generateClaimUrl,
    getManagedIdentityStatus,
    importManagedIdentityCredentials
} from "@services/identity.service";

export type { CreatedManagedIdentity } from '@model/created-managed-identity';
export type { IdentityClaimRequest } from "@model/identity-claim-request";
export type { ManagedIdentityStatus } from "@model/managed-identity-status";

export {
    configure
} from "@services/settings.service";

