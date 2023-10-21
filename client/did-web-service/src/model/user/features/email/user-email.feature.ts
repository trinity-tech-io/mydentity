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
import { AdvancedBehaviorSubject } from "@utils/advanced-behavior-subject";
import { onMessage } from "@services/websockets/websocket.events";
import { WebSocketEventType } from "@services/websockets/websocket.types";

export function isEmailAlreadyExistsException(e: AppException): boolean {
    return e.appExceptionCode === AuthExceptionCode.EmailAlreadyExists;
}

export function isEmailNotExistsException(e: AppException): boolean {
    return e.appExceptionCode === AuthExceptionCode.InexistingEmail;
}

export class UserEmailFeature implements UserFeature {
    public userEmails$ = new AdvancedBehaviorSubject<UserEmail[]>([], () => this.fetchUserEmails());

    constructor(protected user: User) {
        this.connectSocketEvents();
    }

    private connectSocketEvents(): void {
        onMessage.subscribe(async e => {
            if (e.event === WebSocketEventType.USER_EMAIL_CREATED) {
                logger.log("userEmail", 'USER_EMAIL_CREATED:', e.data);
                const userEmail = await UserEmail.fromJson(e.data);
                const email = this.userEmails$.value.find(e => e.id === userEmail.id);
                if (!email) {
                    logger.log("userEmail", 'USER_EMAIL_CREATED, append a new one,', userEmail);
                    this.userEmails$.next([...this.userEmails$.value, userEmail]);
                }
            }
        });
    }

    private async fetchUserEmails(): Promise<UserEmail[]> {
        logger.log("user", "Fetching user emails.");

        const result = await withCaughtAppException(async () => {
            return (await getApolloClient()).query<{
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

        if (result?.data?.fetchUserEmails) {
            // console.log(`>>>>> UserEmailFeature.fetchUserEmails`, result?.data?.fetchUserEmails);
            const emails = result.data.fetchUserEmails.map(e => UserEmail.fromJson(e, this.user));
            // INFO: Maybe websocket USER_EMAIL_CREATED events arrived first.
            return [...emails, ...this.userEmails$.value];
        }

        console.error('user', 'can not fetch user emails.');
        return null;
    }

    public async removeUserEmail(id: string): Promise<boolean> {
        logger.log("user", "remove user email.");

        const result = await withCaughtAppException(async () => {
            return (await getApolloClient()).mutate<{
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

        if (!result?.data?.removeUserEmail) {
            console.error('user', 'can not remove user email.');
        }

        return result?.data?.removeUserEmail;
    }

    /**
     * Checks the given temporary authentication key and signs the user in if successful
     * static function is for login/bind.
     */
    public async checkRawEmailBind(authKey: string, pinCode: string): Promise<boolean> {
        logger.log("user", "Checking temporary authentication key for email bind.");

        const result = await withCaughtAppException(async () => {
            return (await getApolloClient()).mutate<{
                checkEmailBind: {
                    accessToken: string;
                    refreshToken: string;
                }
            }>({
                mutation: gql`
                    mutation CheckEmailBind($authKey: String!, $pinCode: String!) {
                        checkEmailBind(authKey: $authKey, pinCode: $pinCode) { accessToken refreshToken }
                    }
                `,
                variables: { authKey, pinCode }
            });
        }, null, [
            AuthExceptionCode.InvalidPINCode,
            AuthExceptionCode.InexistingAuthKey
        ]);

        if (!result?.data?.checkEmailBind) {
            logger.error('Failed to check email bind');
            return false;
        }

        return true;
    }

    /**
     * Initiates a user authentication by email address. This sends a magic auth link by email
     * and user needs to click that link to finalize the authentication.
     */
    public async bindWithEmailAddress(emailAddress: string): Promise<void> {
        logger.log("user", "Sending request to authentication by email");

        await withCaughtAppException(async () => {
            return (await getApolloClient()).mutate<unknown>({
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