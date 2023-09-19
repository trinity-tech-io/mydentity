import { didDocumentService } from "@services/identity/diddocuments.service";
import { AdvancedBehaviorSubject } from "@utils/advanced-behavior-subject";
import { BehaviorSubject } from "rxjs";
import { InteractingApplicationDTO } from "./requested-credentials.dto";

export class InteractingApplication {
  id: string;
  createdAt: Date;
  did: string;

  public name$ = new AdvancedBehaviorSubject<string>(null, () => this.fetchAppDocument());
  public icon$ = new BehaviorSubject<string>(null); // No lazy fetching, accessing name will fetch the icon as well.

  public static async fromJson(json: InteractingApplicationDTO): Promise<InteractingApplication> {
    const application = new InteractingApplication();
    Object.assign(application, json);

    application.createdAt = new Date(json.createdAt);

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