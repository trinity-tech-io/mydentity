import { gql } from "@apollo/client";
import { gqlBrowserFields } from "@graphql/browser.fields";
import { Browser } from "@model/browser/browser";
import { BrowserDTO } from "@model/browser/browser.dto";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { logger } from "@services/logger";
import { AdvancedBehaviorSubject } from "@utils/advanced-behavior-subject";
import { User } from "../../user";
import { UserFeature } from "../user-feature";

export class BrowserFeature implements UserFeature {
  public browsers$ = new AdvancedBehaviorSubject<Browser[]>([], () => this.fetchBrowsers());

  constructor(protected user: User) { }

  private async fetchBrowsers(): Promise<Browser[]> {
    logger.log("devices", "Fetching user browsers");

    const result = await withCaughtAppException(async () => {
      return (await getApolloClient()).query<{ browsers: BrowserDTO[] }>({
        query: gql`
        query ListBrowsers {
          browsers {
            ${gqlBrowserFields}
          }
        }
      `
      });
    });

    if (result?.data?.browsers) {
      const browsers = await Promise.all(result.data.browsers.map(browser => Browser.fromJson(browser)));
      logger.log("browsers", "Fetched browsers:", browsers);
      return browsers;
    }

    return null;
  }

  public async deleteBrowser(browserId: string): Promise<boolean> {
    logger.log("browsers", "Deleting browser");

    const result = await withCaughtAppException(async () => {
      return (await getApolloClient()).mutate<{ deleteBrowser: boolean }>({
        mutation: gql`
        mutation deleteBrowser($browserId: String!) {
          deleteBrowser(browserId: $browserId)
        }
      `,
        variables: {
          browserId
        }
      });
    });

    if (result?.data?.deleteBrowser) {
      this.browsers$.next(this.browsers$.value.filter(i => i.id != browserId));
      return true;
    }
    else {
      throw new Error("Failed to delete Browser");
    }
  }
}