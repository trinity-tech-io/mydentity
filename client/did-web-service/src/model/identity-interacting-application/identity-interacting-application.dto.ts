import { InteractingApplicationDTO } from "@model/interacting-application/interacting-application.dto";

export class IdentityInteractingApplicationDTO {
  id: string;
  createdAt: string;
  interactingApplication: InteractingApplicationDTO;
}
