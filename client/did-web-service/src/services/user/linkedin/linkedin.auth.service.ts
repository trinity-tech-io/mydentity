import { User } from "@model/user/user";
import { logger } from "@services/logger";
import { LinkedinSignInInput } from "@services/user/linkedin/linkedin-sign-in.input";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { LoggedUserOutput } from "@services/user/logged-user.output";
import { gql } from "@apollo/client";
import { LinkedinBindEmailInput } from "@services/user/linkedin/linkedin-bind-email.input";
import { updateUserByToken } from "@services/user/user.service";

export async function oauthLinkedinSignIn(code: string): Promise<User> {
    logger.log('user', 'oauth Linkedin sign in.');

    const input: LinkedinSignInInput = { code };

    const response = await withCaughtAppException(async () => {
        return (await getApolloClient()).mutate<{ oauthLinkedinSignIn: LoggedUserOutput }>({
            mutation: gql`
        mutation OauthLinkedinSignIn($input: LinkedinSignInInput!) {
          oauthLinkedinSignIn(input: $input) { accessToken refreshToken }
        }
      `,
            variables: { input }
        });
    });

    if (response?.data && response.data.oauthLinkedinSignIn) {
        const { accessToken, refreshToken } = response.data.oauthLinkedinSignIn;
        return updateUserByToken(accessToken, refreshToken);
    }
    else {
        // TODO: print error
        logger.error('user', 'failed to oauth Linkedin sign in.');
        return null;
    }
}

export async function oauthLinkedinBindEmail(code: string): Promise<boolean> {
    logger.log('user', 'oauth Linkedin bind email.');

    const input: LinkedinBindEmailInput = { code };

    const response = await withCaughtAppException(async () => {
        return (await getApolloClient()).mutate<{ oauthLinkedBindEmail: boolean }>({
            mutation: gql`
        mutation OauthLinkedBindEmail($input: LinkedinBindEmailInput!) {
          oauthLinkedBindEmail(input: $input)
        }
      `,
            variables: { input }
        });
    });

    if (response?.data && response.data.oauthLinkedBindEmail) {
        logger.log('user', 'Oauth Linkedin email bound successfully');
        return true;
    }
    else {
        // TODO: print error
        logger.error('user', 'failed to oauth Linkedin bind email.');
        return false;
    }
}