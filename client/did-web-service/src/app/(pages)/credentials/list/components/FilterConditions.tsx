import { Credential } from '@model/credential/credential';
import { Identity } from "@model/identity/identity";

type FilterCondition = (credential: Credential, activeIdentity?: Identity) => boolean;
interface FilterConditions {
  [key: string]: FilterCondition;
  filter0: FilterCondition;
  filter1: FilterCondition;
  filter2: FilterCondition;
  filter3: FilterCondition;
  filter4: FilterCondition;
}

const commonFilter = (credential: Credential, activeIdentity: Identity, isMe: boolean): boolean => {
  const issuer = credential?.getIssuer();
  const activeDid = activeIdentity?.did.toString();
  return (issuer === activeDid) === isMe;
};

const filterConditions: FilterConditions = {
  filter0: () => true,
  filter1: (credential, activeIdentity) => commonFilter(credential, activeIdentity, true),
  filter2: (credential, activeIdentity) => commonFilter(credential, activeIdentity, false),
  filter3: (credential) => credential.isConform$.getValue(),
  filter4: (credential) => !credential.isConform$.getValue(),
};

export const filterCredentials = (selectedFilter: string | undefined, credentials: Credential[], activeIdentity?: Identity): Credential[] => {
  return credentials.filter(credential => {
    const condition = filterConditions[selectedFilter];
    if (condition) {
      return condition(credential, activeIdentity);
    }
    return true;
  });
};

export function arraysAreEqual(arr1?: Credential[], arr2?: Credential[]): boolean {
  if (arr1?.length !== arr2?.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}