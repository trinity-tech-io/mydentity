export {
    createManagedIdentity, generateClaimUrl, getManagedIdentityStatus, importManagedIdentityCredentials
} from "@services/identity.service";

export type {
    CreatedManagedIdentity
} from '@services/identity.service';

export type {
    ManagedIdentityStatus
} from "@model/managed-identity-status";

export {
    configure
} from "@services/settings.service";

