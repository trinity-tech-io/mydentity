import {ActivityDto} from "@model/activity/activity.dto";
import {ActivityType} from "@model/activity/activity-type";
import moment from "moment";

export class Activity {
    public id: string;
    public type: string;
    public content: any;
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
            case ActivityType.SIGNED_IN:
                if (this.content.type === 'RAW_EMAIL')
                    return 'Signed in with raw email.';
                else if (this.content.type === 'OAUTH_MICROSOFT')
                    return 'Signed in with Microsoft oauth email.';
                return `Signed in with handled type ${this.content.type}`;
            case ActivityType.DID_CREATED:
                return `DID ${this.content.did} created`;
            case ActivityType.DID_DELETED:
                return `DID ${this.content.did} deleted`;
            case ActivityType.VC_CREATED:
                return `Verified credential created from DID ${this.content.did}`;
            case ActivityType.VC_IMPORTED:
                return `Verified credential imported to DID ${this.content.did}`;
            default:
                break;
        }
        return '';
    }

}