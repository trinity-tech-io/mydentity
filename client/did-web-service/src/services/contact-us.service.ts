import { gql } from "@apollo/client";
import { getApolloClient } from "@services/graphql.service";
import { logger } from "@services/logger";
import { withCaughtAppException } from "@services/error.service";

class ContactUsService {
  /**
  * Sends a bug report or improvement request to the team.
  */
  public async sendReport(message: string): Promise<boolean> {
    const { data } = await withCaughtAppException(async () => {
      return await (await getApolloClient()).mutate<{ submitContactUs: boolean }>({
        mutation: gql`
          mutation SubmitContactUs($message: String!) {
            submitContactUs(message: $message)
          }
        `,
        variables: {message}
      });
    });

    const reportSent = data?.submitContactUs;
    if (reportSent) {
      logger.log("contact-us", "Contact us message sent.");
    } else {
      logger.warn("contact-us", "Failed to send contact us message.");
    }

    return reportSent;
  }
}

export const contactUsService = new ContactUsService();