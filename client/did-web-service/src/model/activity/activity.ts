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
                return this.content.message;
            default:
                break;
        }
        return '';
    }

}