import { gql } from "@apollo/client";
import { graphQLActivityFields } from "@graphql/activity.fields";
import { Activity } from "@model/activity/activity";
import { ActivityType } from "@model/activity/activity-type";
import { ActivityDto } from "@model/activity/activity.dto";
import { UserFeature } from "@model/user/features/user-feature";
import { User } from "@model/user/user";
import { getApolloClient } from "@services/graphql.service";
import { logger } from "@services/logger";
import { AdvancedBehaviorSubject } from "@utils/advanced-behavior-subject";

export class ActivityFeature implements UserFeature {
    public activities$ = new AdvancedBehaviorSubject<Activity[]>([], () => this.fetchActivities());

    constructor(protected user: User) { }

    private async fetchActivities(): Promise<Activity[]> {
        logger.log("activity", "Fetch activities");

        const { data } = await (await getApolloClient()).query<{ activities: ActivityDto[] }>({
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

        const result = await (await getApolloClient()).mutate<{ createActivity: ActivityDto }>({
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

        if (result?.data?.createActivity) {
            logger.log("activity", "Create activities", result.data.createActivity);
            return Activity.fromJson(result.data.createActivity);
        } else {
            throw new Error('Can not create activity.');
        }
    }

    public async updateActivity(id: string, type: ActivityType, content: any): Promise<Activity> {
        logger.log("activity", "Update activity");

        const result = await (await getApolloClient()).mutate<{ activity: ActivityDto }>({
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

        if (result?.data?.activity) {
            logger.log("activity", "Update activities", result.data.activity);
            return Activity.fromJson(result.data.activity);
        } else {
            throw new Error('Can not update activity.');
        }
    }
}