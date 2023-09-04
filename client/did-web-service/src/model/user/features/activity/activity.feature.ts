import { UserFeature } from "@model/user/features/user-feature";
import { User } from "@model/user/user";
import { LazyBehaviorSubjectWrapper } from "@utils/lazy-behavior-subject";
import { BehaviorSubject } from "rxjs";
import { Activity } from "@model/activity/activity";
import { logger } from "@services/logger";
import { getApolloClient } from "@services/graphql.service";
import { ActivityDto } from "@model/activity/activity.dto";
import { gql } from "@apollo/client";
import { graphQLActivityFields } from "@graphql/activity.fields";
import { ActivityType } from "@model/activity/activity-type";

export class ActivityFeature implements UserFeature {
    private _activities$ = new LazyBehaviorSubjectWrapper<Activity[]>([], () => this.fetchActivities());
    public get activities$(): BehaviorSubject<Activity[]> { return this._activities$.getSubject(); }

    constructor(protected user: User) { }

    private async fetchActivities(): Promise<Activity[]> {
        logger.log("activity", "Fetch activities");

        const { data } = await getApolloClient().query<{ activities: ActivityDto[] }>({
            query: gql`
        query Activities {
            activities { 
                ${graphQLActivityFields}
            }
        } `
        });

        if (data) {
            logger.log("activity", "Get activities", data.activities);
            return data.activities.map(a => Activity.fromJson(a));
        } else {
            throw new Error('Can not get activities.');
        }
    }

    public async createActivity(type: ActivityType, content: any): Promise<Activity> {
        logger.log("activity", "Create activity");

        const { data } = await getApolloClient().mutate<{ activity: ActivityDto }>({
            mutation: gql`
        mutation CreateActivity($input: CreateActivityInput!) {
            createActivity(input: $input) {
                ${graphQLActivityFields}
            }
        } `,
            variables: {
                input: {
                    type, content
                }
            }
        });

        if (data) {
            logger.log("activity", "Create activities", data.activity);
            return Activity.fromJson(data.activity);
        } else {
            throw new Error('Can not create activity.');
        }
    }

    public async updateActivity(id: string, type: ActivityType, content: any): Promise<Activity> {
        logger.log("activity", "Update activity");

        const { data } = await getApolloClient().mutate<{ activity: ActivityDto }>({
            mutation: gql`
        mutation UpdateActivity($input: UpdateActivityInput!) {
            updateActivity(input: $input) {
                ${graphQLActivityFields}
            }
        } `,
            variables: {
                input: {
                    id, type, content
                }
            }
        });

        if (data) {
            logger.log("activity", "Update activities", data.activity);
            return Activity.fromJson(data.activity);
        } else {
            throw new Error('Can not update activity.');
        }
    }
}