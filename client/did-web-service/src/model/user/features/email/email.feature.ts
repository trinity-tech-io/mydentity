import {UserFeature} from "@model/user/features/user-feature";
import {UserEmail} from "@model/user/features/email/email";
import {logger} from "@services/logger";
import {withCaughtAppException} from "@services/error.service";
import {getApolloClient} from "@services/graphql.service";
import {UserEmailDTO} from "@model/user/features/email/email.dto";
import {gql} from "@apollo/client";
import {graphQLPublicUserEmailFields} from "@graphql/user-email.fields";
import {User} from "@model/user/user";

export class UserEmailFeature implements UserFeature {
    constructor(protected user: User) {}

    public async listUserEmails(): Promise<UserEmail[]> {
        logger.log("user", "list user emails.");

        const { data } = await withCaughtAppException(() => {
            return getApolloClient().query<{
                listUserEmails: UserEmailDTO[]
            }>({
                query: gql`
                query ListUserEmails() {
                  listUserEmails() {
                    ${graphQLPublicUserEmailFields}
                  }
                }
                `,
                variables: { }
            });
        });

        if (data?.listUserEmails) {
            return data.listUserEmails.map(e => UserEmail.fromJson(e, this.user));
        }

        console.error('user', 'can not fetch user emails.');
        return null;
    }

    public async removeUserEmail(id: string): Promise<boolean> {
        logger.log("user", "remove user email.");

        const { data } = await withCaughtAppException(() => {
            return getApolloClient().mutate<{
                removeUserEmail: boolean
            }>({
                mutation: gql`
                query RemoveUserEmail($id: String!) {
                  removeUserEmail(id: $id)
                }
                `,
                variables: { id }
            });
        });

        const result = data && data.removeUserEmail;
        if (!result) {
            console.error('user', 'can not remove user email.');
        }
        return result;
    }
}