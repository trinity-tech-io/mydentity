import { ActivityDto } from "@model/activity/activity.dto";
import { Browser } from "@model/browser/browser";
import moment from "moment";
import { UserEmail } from "@model/user-email/user-email";
import { Identity } from "@model/identity/identity";

export class Activity {
    public id: string;
    public type: string;
    public userEmail?: UserEmail;
    public userEmailProvider?: string;
    public userEmailAddress?: string;
    public identity?: Identity;
    public identityDid?: string;
    public credentialsCount?: number;
    public appDid?: string;

    public browser?: Browser;
    public browserName?: string;
    public createdAt: Date;

    public static async fromJson(json: ActivityDto): Promise<Activity> {
        const activity: Activity = new Activity();
        Object.assign(activity, json);

        if (json.userEmail)
            activity.userEmail = UserEmail.fromJson(json.userEmail);

        if (json.identity)
            activity.identity = await Identity.fromJson(json.identity);

        if (json.browser)
            activity.browser = await Browser.fromJson(json.browser);

        activity.createdAt = new Date(json.createdAt);

        return activity;
    }

    public getCreatedAtStr(): string {
        return (moment(this.createdAt)).format('DD-MMM-YYYY HH:mm:ss')
    }
}