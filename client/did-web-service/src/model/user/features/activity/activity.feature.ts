import { gql } from "@apollo/client";
import { graphQLActivityFields } from "@graphql/activity.fields";
import { Activity } from "@model/activity/activity";
import type { ActivityDto } from "@model/activity/activity.dto";
import type { CreateActivityInput } from "@model/activity/create-activity.input";
import { UserFeature } from "@model/user/features/user-feature";
import type { User } from "@model/user/user";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { logger } from "@services/logger";
import { onMessage } from "@services/websockets/websocket.events";
import { WebSocketEventType } from "@services/websockets/websocket.types";
import { AdvancedBehaviorSubject } from "@utils/advanced-behavior-subject";
import { DeleteActivitiesInput } from "@model/activity/delete-activities.input";

export class ActivityFeature implements UserFeature {
    public activities$ = new AdvancedBehaviorSubject<Activity[]>([], () => this.fetchActivities());

    constructor(protected user: User) {
        this.connectSocketEvents();
    }

    private connectSocketEvents(): void {
        onMessage.subscribe(async e => {
            if (e.event === WebSocketEventType.ACTIVITY_CREATED) {
                logger.log("activity", 'ACTIVITY_CREATED:', e.data);
                const activity = await Activity.fromJson(e.data);
                this.activities$.next([activity].concat(this.activities$.value));
            }
        });
    }

    private async fetchActivities(): Promise<Activity[]> {
        logger.log("activity", "Fetch activities", this.user);

        const { data } = await withCaughtAppException(async () => {
            return await (await getApolloClient()).query<{ activities: ActivityDto[] }>({
                query: gql`
            query Activities {
                activities {
                    ${graphQLActivityFields}
                }
            } `
            });
        });

        if (data) {
            logger.log("activity", "Get activities", data.activities);
            const { Activity } = await import("@model/activity/activity"); // Circular deps
            const activities = await Promise.all(data.activities.map(a => Activity.fromJson(a)));
            return this.sortRecentActivitiesFirst(activities);
        } else {
            throw new Error('Can not get activities.');
        }
    }

    // TODO: better let the API do that instead of client
    private sortRecentActivitiesFirst(activities: Activity[]): Activity[] {
        return activities.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    public async createActivity(input: CreateActivityInput): Promise<Activity> {
        logger.log("activity", "Create activity");

        const result = await withCaughtAppException(async () => {
            return await (await getApolloClient()).mutate<{ createActivity: ActivityDto }>({
                mutation: gql`
                mutation CreateActivity($input: CreateActivityInput!) {
                    createActivity(input: $input) {
                        ${graphQLActivityFields}
                    }
                } `,
                variables: { input }
            });
        });

        if (result?.data?.createActivity) {
            logger.log("activity", `Create activities with input ${input}`, result.data.createActivity);
            const { Activity } = await import("@model/activity/activity"); // Circular deps
            return Activity.fromJson(result.data.createActivity);
        } else {
            logger.error('activity', 'Failed to create activity.');
            return null;
            // throw new Error('Failed to create activity.');
        }
    }

    public async deleteActivities(input: DeleteActivitiesInput): Promise<boolean> {
        logger.log("activity", "Delete activities");

        const result = await withCaughtAppException(async () => {
            return await (await getApolloClient()).mutate<{ deleteActivities: ActivityDto }>({
                mutation: gql`
                mutation DeleteActivities($input: DeleteActivitiesInput!) {
                    deleteActivities(input: $input)
                } `,
                variables: { input }
            });
        });

        if (result?.data?.deleteActivities) {
            return true;
        } else {
            logger.error('activity', 'Failed to delete activities.');
            return false;
        }
    }
}