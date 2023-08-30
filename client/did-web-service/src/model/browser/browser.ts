import { BrowserDTO } from "./browser.dto";

export class Browser {
  id: string;
  createdAt: Date;
  lastUsedAt: Date;
  userAgent: string;
  name: string;

  public static async fromJson(json: BrowserDTO): Promise<Browser> {
    const browser = new Browser();
    Object.assign(browser, json);

    browser.createdAt = new Date(json.createdAt);
    browser.lastUsedAt = new Date(json.lastUsedAt);

    return browser;
  }

  public equals(otherBrowser: Browser): boolean {
    return this.id === otherBrowser.id;
  }
}