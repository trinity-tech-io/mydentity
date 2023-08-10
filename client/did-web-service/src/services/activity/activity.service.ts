import { BehaviorSubject } from "rxjs";
import { Activity } from "./activity";

/**
 * Service used to indicate a service activity such as a file upload, resource fetching, etc.
 * This service is used to display the activity indicator on top top header.
 */
class ActivityService {
  private activities: Activity[] = [];
  public isActive$ = new BehaviorSubject<boolean>(false);

  public async runActivity<T>(cb: () => Promise<T>): Promise<T> {
    const activity = this.setActive();
    const ret = await cb();
    activity.done();
    return ret;
  }

  public setActive(): Activity {
    const activity = new Activity(() => {
      // Done
      this.activities = this.activities.filter(a => !a.equals(activity));
      this.updateActivityStatus();
    });

    this.activities.push(activity);
    this.updateActivityStatus();

    return activity;
  }

  private updateActivityStatus() {
    this.isActive$.next(this.activities.length > 0);
  }
}

export const activityService = new ActivityService();