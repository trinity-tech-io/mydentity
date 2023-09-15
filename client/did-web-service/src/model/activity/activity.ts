import {ActivityDto} from "@model/activity/activity.dto";
import {ActivityType} from "@model/activity/activity-type";
import moment from "moment";
import {UserEmailProvider} from "@model/user-email/user-email-provider";

export class Activity {
    public id: string;
    public type: string;
    public userEmailProvider?: string;
    public identityStr?: string;
    public credentialsCount?: number;
    public appDid?: string;
    public browserName?: string;
    public createdAt: Date;

    public static fromJson(json: ActivityDto): Activity {
        const activity: Activity = new Activity();
        return Object.assign(activity, json);
    }

    public getCreatedAtStr(): string {
        return (moment(this.createdAt)).format('DD-MMM-YYYY HH:mm:ss')
    }

    public getDescription(): string {
        switch (this.type) {
            case ActivityType.USER_SIGN_IN:
                if (this.userEmailProvider == UserEmailProvider.RAW)
                    return 'Signed in with raw email.';
                else if (this.userEmailProvider === UserEmailProvider.MICROSOFT)
                    return 'Signed in with Microsoft oauth email.';
                return `Signed in with handled type ${this.userEmailProvider}`;
            case ActivityType.IDENTITY_CREATED:
                return `DID ${this.identityStr} created`;
            case ActivityType.IDENTITY_DELETED:
                return `DID ${this.identityStr} deleted`;
            case ActivityType.CREDENTIALS_SHARED:
                return `${this.credentialsCount} verified credentials shared.`;
            case ActivityType.CREDENTIALS_IMPORTED:
                return `${this.credentialsCount} verified credential imported.`;
            default:
                break;
        }
        return '';
    }

}