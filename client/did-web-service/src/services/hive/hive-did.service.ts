
/**
 * From a DID Credential subject payload, tries to extract a avatar hive url.
 * Returns this url if possible, or null otherwise.
 */
export const getHiveAvatarUrlFromDIDAvatarCredential = (avatarCredentialSubject: any): string => {
  if (!avatarCredentialSubject)
    return null;

  if (avatarCredentialSubject.type && avatarCredentialSubject.type === 'elastoshive') {
    if (avatarCredentialSubject.data && avatarCredentialSubject['content-type']) {
      return avatarCredentialSubject.data;
    }
  }

  // Other cases: return nothing.
  return null;
};
