import { User } from "@model/user/user";
import { logger } from "@services/logger";
import { GoogleSignInInput } from "@services/user/google/google-sign-in.input";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { LoggedUserOutput } from "@services/user/logged-user.output";
import { gql } from "@apollo/client";
import { GoogleBindEmailInput } from "@services/user/google/google-bind-email.input";
import { updateUserByToken } from "@services/user/user.service";

export async function oauthGoogleSignIn(code: string): Promise<User> {
    logger.log('user', 'oauth Google sign in.');

    const input: GoogleSignInInput = { code };

    const response = await withCaughtAppException(async () => {
        return (await getApolloClient()).mutate<{ oauthGoogleSignIn: LoggedUserOutput }>({
            mutation: gql`
        mutation OauthGoogleSignIn($input: GoogleSignInInput!) {
          oauthGoogleSignIn(input: $input) { accessToken refreshToken }
        }
      `,
            variables: { input }
        });
    });

    if (response?.data && response.data.oauthGoogleSignIn) {
        const { accessToken, refreshToken } = response.data.oauthGoogleSignIn;
        return updateUserByToken(accessToken, refreshToken);
    }
    else {
        // TODO: print error
        logger.error('user', 'failed to oauth Google sign in.');
        return null;
    }
}

export async function oauthGoogleBindEmail(code: string): Promise<boolean> {
    logger.log('user', 'oauth Google bind email.');

    const input: GoogleBindEmailInput = { code };

    const response = await withCaughtAppException(async () => {
        return (await getApolloClient()).mutate<{ oauthGoogleBindEmail: boolean }>({
            mutation: gql`
        mutation OauthGoogleBindEmail($input: GoogleBindEmailInput!) {
          oauthGoogleBindEmail(input: $input)
        }
      `,
            variables: { input }
        });
    });

    if (response?.data && response.data.oauthGoogleBindEmail) {
        logger.log('user', 'Oauth Google email bound successfully');
        return true;
    }
    else {
        // TODO: print error
        logger.error('user', 'failed to oauth Google bind email.');
        return false;
    }
}