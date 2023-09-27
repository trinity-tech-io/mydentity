import { IdentityProvider } from "../did.provider";
import { CredentialsModule } from "./modules/credentials.module";
import { DocumentModule } from "./modules/document.module";
import { IdentityModule } from "./modules/identity.module";
import { PresentationModule } from "./modules/presentation.module";
import { PublicationModule } from "./modules/publication.module";

export class CustodialDIDProvider implements IdentityProvider {
  public identity: IdentityModule = new IdentityModule(this);
  public publication = new PublicationModule();
  public credentials = new CredentialsModule();
  public presentation = new PresentationModule();
  public document = new DocumentModule();
}