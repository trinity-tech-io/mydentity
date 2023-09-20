import { didDocumentService } from "@services/identity/diddocuments.service";
import { AdvancedBehaviorSubject } from "@utils/advanced-behavior-subject";
import { BehaviorSubject } from "rxjs";
import { InteractingApplicationDTO } from "./interacting-application.dto";

export class InteractingApplication {
  id: string;
  createdAt: Date;
  did: string;

  public icon$ = new AdvancedBehaviorSubject<string>(null, () => this.fetchAppDocument());
  public name$ = new BehaviorSubject<string>(null); // No lazy fetching, accessing icon will fetch the name as well.

  public static async fromJson(json: InteractingApplicationDTO): Promise<InteractingApplication> {
    const application = new InteractingApplication();
    Object.assign(application, json);

    application.createdAt = new Date(json.createdAt);

    return application;
  }

  /**
   * Creates an InteractingApplication on the client side without counterpart on the backend.
   * Used to display any kind of "app DID" that is not provided as a InteractingApplication object initially.
   */
  public static async fromLocalDid(did: string): Promise<InteractingApplication> {
    const application = new InteractingApplication();
    application.did = did;
    return application;
  }

  private async fetchAppDocument(): Promise<void> {
    const document = await didDocumentService.resolveDIDDocument(this.did);

    if (document) {
      this.name$.next(await document.getRepresentativeOwnerName());
      this.icon$.next(await document.getRepresentativeIcon());
    }
  }
}