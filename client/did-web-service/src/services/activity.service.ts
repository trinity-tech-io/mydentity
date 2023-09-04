import { gql } from "@apollo/client";
import { graphQLActivityFields } from "@graphql/activity.fields";
import { Activity } from "@model/activity/activity";
import { ActivityDto } from "@model/activity/activity.dto";
import { getApolloClient } from "@services/graphql.service";
import { logger } from "@services/logger";
import { ActivityType } from "@model/activity/activity-type";

export async function getActivities(): Promise<Activity[]> {
    logger.log("activity", "Get activities");

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

export async function createActivity(type: ActivityType, content: any): Promise<Activity> {
    logger.log("activity", "Create activity");

    const { data } = await (await getApolloClient()).mutate<{ activity: ActivityDto }>({
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

export async function updateActivity(id: string, type: ActivityType, content: any): Promise<Activity> {
    logger.log("activity", "Update activity");

    const { data } = await (await getApolloClient()).mutate<{ activity: ActivityDto }>({
        mutation: gql` query UpdateActivity($input: UpdateActivityInput!) {
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
