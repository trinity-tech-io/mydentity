"use client"
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { activeIdentity$ } from "@services/identity/identity.events";
import { FC } from "react";

const CredentialsList: FC = () => {
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const [credentials] = useBehaviorSubject(activeIdentity?.get("credentials").credentials$);

  return (<div className="col-span-full">
    List of credentials for the active identity (DID). This list is retrieved from the active identities credentials feature and subject.
    <br /><br />
    We should list the credentials on this page, like in Essentials. Clicking a VC opens the VC details page.
    <br /><br />
    <br /><br />
    {
      credentials?.map(c => <div key={c.id}>{c.verifiableCredential.getId().toString()} -- </div>)
    }
  </div>)
}

export default CredentialsList;