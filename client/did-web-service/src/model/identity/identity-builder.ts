import { ApplicationIdentity } from "@model/application-identity/application-identity";
import { RegularIdentity } from "@model/regular-identity/regular-identity";
import { IdentityProvider } from "@services/identity/did.provider";
import { Identity } from "./identity";
import { IdentityType } from "./identity-type";
import { IdentityDTO } from "./identity.dto";

export async function identityFromJson(json: IdentityDTO, provider: IdentityProvider): Promise<Identity> {
  switch (json.type) {
    case IdentityType.REGULAR:
      return RegularIdentity.fromJson(json, provider);
    case IdentityType.APPLICATION:
      return ApplicationIdentity.fromJson(json, provider);
    default:
      throw new Error(`Unknow identity type ${json.type}`);
  }
}
