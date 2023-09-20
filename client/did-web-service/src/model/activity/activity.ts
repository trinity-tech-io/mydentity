import { ActivityDto } from "@model/activity/activity.dto";
import { Browser } from "@model/browser/browser";
import moment from "moment";

export class Activity {
    public id: string;
    public type: string;
    public userEmailProvider?: string;
    public identityStr?: string;
    public credentialsCount?: number;
    public appDid?: string;

    public browser?: Browser;
    public browserName?: string;
    public createdAt: Date;

    public static async fromJson(json: ActivityDto): Promise<Activity> {
        const activity: Activity = new Activity();
        Object.assign(activity, json);

        activity.createdAt = new Date(json.createdAt);

        if (json.browser)
            activity.browser = await Browser.fromJson(json.browser);

        return activity;
    }

    public getCreatedAtStr(): string {
        return (moment(this.createdAt)).format('DD-MMM-YYYY HH:mm:ss')
    }
}