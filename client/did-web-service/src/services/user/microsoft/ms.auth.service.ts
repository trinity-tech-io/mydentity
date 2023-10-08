import { User } from "@model/user/user";
import { logger } from "@services/logger";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { LoggedUserOutput } from "@services/user/logged-user.output";
import { gql } from "@apollo/client";
import { updateUserByToken } from "@services/user/user.service";
import { MsSignInInput } from "@services/user/microsoft/ms-sign-in.input";
import { MsBindEmailInput } from "@services/user/microsoft/ms-bind-email.input";

export async function oauthMSSignIn(code: string): Promise<User> {
    logger.log('user', 'oauth MS sign in.');

    const input: MsSignInInput = { code };

    const response = await withCaughtAppException(async () => {
        return (await getApolloClient()).mutate<{ oauthMSSignIn: LoggedUserOutput }>({
            mutation: gql`
        mutation OauthMSSignIn($input: MsSignInInput!) {
          oauthMSSignIn(input: $input) { accessToken refreshToken }
        }
      `,
            variables: { input }
        });
    });

    if (response?.data && response.data.oauthMSSignIn) {
        const { accessToken, refreshToken } = response.data.oauthMSSignIn;
        return updateUserByToken(accessToken, refreshToken);
    }
    else {
        // TODO: print error
        logger.error('user', 'failed to oauth MS sign in.');
        return null;
    }
}

export async function oauthMSBindEmail(code: string): Promise<boolean> {
    logger.log('user', 'oauth MS bind email.');

    const input: MsBindEmailInput = { code };

    const response = await withCaughtAppException(async () => {
        return (await getApolloClient()).mutate<{ oauthMSBindEmail: boolean }>({
            mutation: gql`
        mutation OauthMSBindEmail($input: MsBindEmailInput!) {
          oauthMSBindEmail(input: $input)
        }
      `,
            variables: { input }
        });
    });

    if (response?.data && response.data.oauthMSBindEmail) {
        logger.log('user', 'Oauth MS email bound successfully');
        return true;
    }
    else {
        // TODO: print error
        logger.error('user', 'failed to oauth MS bind email.');
        return false;
    }
}