import { Credential } from "@model/credential/credential";
import { credentialFromJson } from "@model/credential/credential-builder";
import { RequestedCredentialsDTO } from "./requested-credentials.dto";

export class RequestedCredential {
  id: string;
  credential: Credential;

  public static async fromJson(json: RequestedCredentialsDTO): Promise<RequestedCredential> {
    const requestedCredential = new RequestedCredential();
    Object.assign(requestedCredential, json);

    requestedCredential.credential = await credentialFromJson(json.credential);

    return requestedCredential;
  }
}