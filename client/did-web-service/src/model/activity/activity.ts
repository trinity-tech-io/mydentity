import {ActivityDto} from "@model/activity/activity.dto";

export class Activity {
    private id: string;
    private type: string;
    private content: any;
    private createdAt: Date;

    public static fromJson(json: ActivityDto) {
        const activity: Activity = new Activity();
        return Object.assign(activity, json);
    }

}