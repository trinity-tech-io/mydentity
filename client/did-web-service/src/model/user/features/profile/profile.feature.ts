import { User } from "../../user";
import { UserFeature } from "../user-feature";

export class ProfileFeature implements UserFeature {
  constructor(protected user: User) {
  }

  // TODO: JUST A PLACEHOLDER TO DEMO "FEATURES" FOR NOW
}