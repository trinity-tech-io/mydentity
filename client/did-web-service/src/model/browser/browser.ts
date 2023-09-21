import { ShadowKey } from "@model/shadow-key/shadow-key";
import { ShadowKeyType } from "@model/shadow-key/shadow-key-type";
import { getBrowserKey } from "@services/browser.service";
import { authUser$ } from "@services/user/user.events";
import { AdvancedBehaviorSubject } from "@utils/advanced-behavior-subject";
import { browserCache } from "./browser.cache";
import { BrowserDTO } from "./browser.dto";

export class Browser {
  id: string;
  key: string;
  createdAt: Date;
  lastUsedAt: Date;
  userAgent: string;
  name: string;

  /**
   * Passkey shadow key bound to this browser, and still valid. In theory, only one at a time, as binding
   * a passkey in the same browser invalidates the old key.
   */
  public activeShadowKey$ = new AdvancedBehaviorSubject<ShadowKey>(null, async () => {
    authUser$.subscribe(user => {
      return user?.get("security").shadowKeys$.subscribe(keys => {
        this.activeShadowKey$.next(keys?.find(k => k.type === ShadowKeyType.WEBAUTHN && k.browser?.equals(this)));
      });
    });
  });

  public static async fromJson(json: BrowserDTO): Promise<Browser> {
    return browserCache.get(json.id, {
      create: async function (): Promise<Browser> {
        return new Browser();
      },
      fill: async function (browser: Browser): Promise<void> {
        Object.assign(browser, json);

        browser.createdAt = new Date(json.createdAt);
        browser.lastUsedAt = new Date(json.lastUsedAt);
      }
    });
  }

  public isCurrentBrowser(): boolean {
    return this.key === getBrowserKey();
  }

  public equals(otherBrowser: Browser): boolean {
    return this.id === otherBrowser?.id;
  }
}