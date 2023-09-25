import type { ActivityDto } from "@model/activity/activity.dto";
import type { Browser } from "@model/browser/browser";
import type { Identity } from "@model/identity/identity";
import type { UserEmail } from "@model/user-email/user-email";
import moment from "moment";

export class Activity {
    public id: string;
    public createdAt: Date;
    public type: string;
    private userEmail?: UserEmail;
    public userEmailProvider?: string;
    private userEmailAddress?: string;
    private identity?: Identity;
    private identityDid?: string;
    public credentialsCount?: number;
    public appDid?: string;
    private browser?: Browser;
    private browserName?: string;

    public static async fromJson(json: ActivityDto): Promise<Activity> {
        const activity: Activity = new Activity();
        Object.assign(activity, json);

        // Circular deps
        const { Browser } = await import("@model/browser/browser");
        const { Identity } = await import("@model/identity/identity");
        const { UserEmail } = await import("@model/user-email/user-email");

        if (json.userEmail)
            activity.userEmail = UserEmail.fromJson(json.userEmail);

        if (json.identity)
            activity.identity = await Identity.fromJson(json.identity);

        if (json.browser)
            activity.browser = await Browser.fromJson(json.browser);

        activity.createdAt = new Date(json.createdAt);

        return activity;
    }

    public get createdAtStr(): string {
        return (moment(this.createdAt)).format('DD-MMM-YYYY HH:mm:ss')
    }

    public get userEmailAddressStr(): string {
        return this.userEmail ? this.userEmail.email : this.userEmailAddress;
    }

    public get browserNameStr(): string {
        return this.browser ? this.browser.name : this.browserName;
    }

    public get identityDidStr(): string {
        return this.identity ? this.identity.did : this.identityDid;
    }
}