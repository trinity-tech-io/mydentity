import { gql } from "@apollo/client";
import { graphQLActivityFields } from "@graphql/activity.fields";
import { Activity } from "@model/activity/activity";
import { ActivityDto } from "@model/activity/activity.dto";
import { getApolloClient } from "@services/graphql.service";
import { logger } from "@services/logger";

export async function getActivities(): Promise<Activity[]> {
    logger.log("activity", "Get activities");

    const { data } = await getApolloClient().query<{ activities: ActivityDto[] }>({
        query: gql` query ListActivities() {
            listActivities() { 
                ${graphQLActivityFields}
            }
        } `
    });

    if (data) {
        logger.log("graphql", "get activities", data.activities);
        return data.activities.map(a => Activity.fromJson(a));
    } else {
        throw new Error('Can not get access token by refresh token.');
    }
}

export async function createActivity(): Promise<Activity> {
    logger.log("activity", "Create activity");

    const { data } = await getApolloClient().mutate<{ activity: ActivityDto }>({
        mutation: gql` query CreateActivity($input: CreateActivityInput!) {
            createActivity(input: $input) {
                ${graphQLActivityFields}
            }
        } `
    });

    if (data) {
        logger.log("graphql", "get activities", data.activity);
        return Activity.fromJson(data.activity);
    } else {
        throw new Error('Can not get access token by refresh token.');
    }
}

export async function updateActivity() {
    logger.log("activity", "Update activity");

    const { data } = await getApolloClient().mutate<{ activity: ActivityDto }>({
        mutation: gql` query UpdateActivity($input: UpdateActivityInput!) {
            updateActivity(input: $input) {
                ${graphQLActivityFields}
            }
        } `
    });

    if (data) {
        logger.log("graphql", "update activities", data.activity);
        return Activity.fromJson(data.activity);
    } else {
        throw new Error('Can not get access token by refresh token.');
    }
}
