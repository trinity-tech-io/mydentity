import { gql } from "@apollo/client";
import { gqlBrowserFields } from "@graphql/browser.fields";
import { Browser } from "@model/browser/browser";
import { BrowserDTO } from "@model/browser/browser.dto";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { logger } from "@services/logger";
import { LazyBehaviorSubjectWrapper } from "@utils/lazy-behavior-subject";
import { User } from "../../user";
import { UserFeature } from "../user-feature";

export class BrowserFeature implements UserFeature {
  private _browsers$ = new LazyBehaviorSubjectWrapper<Browser[]>([], () => this.fetchBrowsers());
  public get browsers$() { return this._browsers$.getSubject(); }

  constructor(protected user: User) { }

  private async fetchBrowsers(): Promise<Browser[]> {
    logger.log("devices", "Fetching user browsers");

    const { data } = await withCaughtAppException(() => {
      return getApolloClient().query<{ browsers: BrowserDTO[] }>({
        query: gql`
        query ListBrowsers {
          browsers {
            ${gqlBrowserFields}
          }
        }
      `
      });
    });

    if (data && data.browsers) {
      const browsers = await Promise.all(data!.browsers.map(browser => Browser.fromJson(browser)));
      logger.log("browsers", "Fetched browsers:", browsers);
      return browsers;
    }

    return null;
  }
}