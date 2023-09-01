import { gql } from "@apollo/client";
import { graphQLPublicUserEmailFields } from "@graphql/user-email.fields";
import { AppException } from "@model/exceptions/app-exception";
import { AuthExceptionCode } from "@model/exceptions/exception-codes";
import { UserEmail } from "@model/user-email/user-email";
import { UserEmailDTO } from "@model/user-email/user-email.dto";
import { UserFeature } from "@model/user/features/user-feature";
import { User } from "@model/user/user";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { logger } from "@services/logger";
import { LazyBehaviorSubjectWrapper } from "@utils/lazy-behavior-subject";

export function isEmailAlreadyExistsException(e: AppException): boolean {
    return e.appExceptionCode === AuthExceptionCode.EmailAlreadyExists;
}

export function isEmailNotExistsException(e: AppException): boolean {
    return e.appExceptionCode === AuthExceptionCode.EmailNotExists;
}

export class UserEmailFeature implements UserFeature {
    private _userEmails$ = new LazyBehaviorSubjectWrapper<UserEmail[]>([], () => this.fetchUserEmails());
    public get userEmails$() { return this._userEmails$.getSubject(); }

    constructor(protected user: User) { }

    private async fetchUserEmails(): Promise<UserEmail[]> {
        logger.log("user", "list user emails.");

        const { data } = await withCaughtAppException(() => {
            return getApolloClient().query<{
                fetchUserEmails: UserEmailDTO[]
            }>({
                query: gql`
                query FetchUserEmails {
                  fetchUserEmails {
                    ${graphQLPublicUserEmailFields}
                  }
                }
                `
            });
        });

        if (data?.fetchUserEmails) {
            return data.fetchUserEmails.map(e => UserEmail.fromJson(e, this.user));
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
            return getApolloClient().mutate<unknown>({
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