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

    public async bindOauthEmail(email: string) {
        logger.log("user", "Bind oauth email address");

        const { data } = await withCaughtAppException(() => {
            return getApolloClient().mutate<{
                bindOauthEmail: boolean
            }>({
                mutation: gql`
                mutation BindOauthEmail($email: String!) {
                  bindOauthEmail(email: $email)
                }
                `,
                variables: { email }
            });
        });

        const result = data && data.bindOauthEmail;
        if (!result) {
            logger.error('user', 'Failed from bindOauthEmail api.');
        } else {

        }
        return result;
    }

    /**
     * Checks the given temporary authentication key and signs the user in if successful
     */
    public async checkEmailBind(authKey: string): Promise<boolean> {
        logger.log("user", "Checking temporary authentication key for email bind.");

        const { data } = await withCaughtAppException(() => {
            return getApolloClient().mutate<{
                checkEmailBind: {
                    accessToken: string;
                    refreshToken: string;
                }
            }>({
                mutation: gql`
                    mutation CheckEmailBind($authKey: String!) {
                        checkEmailBind(authKey: $authKey) { accessToken refreshToken }
                    }
                `,
                variables: { authKey }
            });
        });

        const result = !!(data && data.checkEmailBind);
        if (!result) {
            logger.error('Failed to check email bind');
        }
        return result;
    }

    /**
     * Initiates a user authentication by email address. This sends a magic auth link by email
     * and user needs to click that link to finalize the authentication.
     */
    public async bindWithEmailAddress(emailAddress: string): Promise<void> {
        logger.log("user", "Sending request to authentication by email");

        await withCaughtAppException(() => {
            return getApolloClient().mutate<{}>({
                mutation: gql`
                    mutation BindWithEmailAddress($emailAddress: String!) {
                        bindWithEmailAddress(emailAddress: $emailAddress) { success }
                    }
                `,
                variables: { emailAddress }
            });
        });
    }
}