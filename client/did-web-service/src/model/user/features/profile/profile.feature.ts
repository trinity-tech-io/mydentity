import { User } from "../../user";
import { UserFeature } from "../user-feature";
import {ProfileEntry} from "@model/user/features/profile/profile-entry";
import Queue from "promise-queue";
import {logger} from "@services/logger";
import {BehaviorSubject} from "rxjs";
import {fetchUserProfile} from "@services/user/user.service";

export class ProfileFeature implements UserFeature {
  /**
   * Public profile, available everywhere.
   */
  public profile$ = new BehaviorSubject<ProfileEntry[]>(null);

  private fetchProfileQueue = new Queue(1);

  private profileFetched = false;

  constructor(protected user: User) {
  }

  // TODO: JUST A PLACEHOLDER TO DEMO "FEATURES" FOR NOW

  public async fetchProfile(): Promise<ProfileEntry[]> {
    // Make sure we don't fetch a user's profile multiple time per session
    // even if fetchProfile is called multiple times.
    return this.fetchProfileQueue.add(async () => {
      if (this.profileFetched)
        return this.profile$.value;

      // logger.log("user", "Fetching user profile", this.user.id);

      const profile = await fetchUserProfile(this.user.id);

      this.profile$.next(profile);

      // this for update user profiles on any pages.
      // this.user.contentChanged.next();

      // logger.log("user", "Fetched user profile", this.user.id);

      this.profileFetched = true;

      return profile;
    });
  }
}