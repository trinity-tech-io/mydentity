import { gql } from "@apollo/client";
import { graphQLActivityFields } from "@graphql/activity.fields";
import { Activity } from "@model/activity/activity";
import { ActivityDto } from "@model/activity/activity.dto";
import { CreateActivityInput } from "@model/activity/create-activity.input";
import { UserFeature } from "@model/user/features/user-feature";
import { User } from "@model/user/user";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { logger } from "@services/logger";
import { AdvancedBehaviorSubject } from "@utils/advanced-behavior-subject";

export class ActivityFeature implements UserFeature {
    public activities$ = new AdvancedBehaviorSubject<Activity[]>([], () => this.fetchActivities());

    constructor(protected user: User) { }

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

    /**
     * static function is for login.
     * when user login, there is no user object there.
     * @param input
     */
    public static async createActivity(input: CreateActivityInput): Promise<Activity> {
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
            return Activity.fromJson(result.data.createActivity);
        } else {
            logger.error('activity', 'Failed to create activity.');
            return null;
            // throw new Error('Failed to create activity.');
        }
    }
}