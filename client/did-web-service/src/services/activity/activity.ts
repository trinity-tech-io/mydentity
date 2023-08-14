type DoneCallback = () => void;

export class Activity {
  private id = Math.random();

  constructor(private onDone: DoneCallback) { }

  public done() {
    // Simple simulation of a minimal activity time to not see the activity
    // spinner flash too often
    setTimeout(() => {
      this.onDone();
    }, 1000);
  }

  public equals(activity: Activity) {
    return this.id === activity.id;
  }
}