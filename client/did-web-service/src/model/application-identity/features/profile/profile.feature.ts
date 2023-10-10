import { ApplicationIdentity } from "@model/application-identity/application-identity";
import { AppInfoCredential } from "@model/credential/app-info-credential";
import { AdvancedBehaviorSubject } from "@utils/advanced-behavior-subject";
import { map } from "rxjs";
import { IdentityFeature } from "../../../identity/features/identity-feature";

export class ProfileFeature implements IdentityFeature {
  public appInfoCredential$ = new AdvancedBehaviorSubject<AppInfoCredential>(null, async () => {
    this.identity.credentials().credentials$.pipe(
      map((creds) => creds?.filter(c => !!c.getTypes().find(t => t === "ApplicationCredential"))),
      map((creds) => creds?.[0]) // There should be only one VC of this type but just in case, we take the first one.
    ).subscribe(cred => {
      this.appInfoCredential$.next(<AppInfoCredential>cred);
    });
  });

  /*public get name$(): BehaviorSubject<string> { return identityInfoNames.listen(this.identity.did); }
  public get icon$(): BehaviorSubject<string> { return identityInfoIcons.listen(this.identity.did); }*/

  constructor(protected identity: ApplicationIdentity) { }
}